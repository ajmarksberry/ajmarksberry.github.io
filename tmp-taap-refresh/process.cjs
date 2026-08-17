const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname);
const outDir = path.join(__dirname, "..", "public", "images", "taap");

const PAD = 120; // 60px at 1x — extra room so drop shadows never clip
const CREAM = [250, 249, 245];
const TEAL = [88, 194, 162];
const FIGMA = [151, 71, 255];
const CHROME = [128, 208, 183];

function dist(r, g, b, t) {
  return Math.max(Math.abs(r - t[0]), Math.abs(g - t[1]), Math.abs(b - t[2]));
}

function isFigmaPurple(r, g, b) {
  return (
    dist(r, g, b, FIGMA) < 55 ||
    (b > 200 && r > 90 && r < 230 && g < 160 && b - g > 60 && b - r > 20)
  );
}

function isKnockout(r, g, b, a, x, y, w, h, fillTeal) {
  if (a < 20) return true;
  if (isFigmaPurple(r, g, b)) return true;
  if (dist(r, g, b, CREAM) <= 14) return true;
  const rim = Math.min(x, y, w - 1 - x, h - 1 - y);
  if (rim <= 4 && dist(r, g, b, CHROME) <= 18) return true;
  if (fillTeal && rim <= 4 && dist(r, g, b, TEAL) <= 8) return false;
  return false;
}

function flood(buf, w, h, c, fill) {
  const seen = new Uint8Array(w * h);
  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (seen[idx]) return;
    const i = idx * c;
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];
    const a = buf[i + 3];
    if (!isKnockout(r, g, b, a, x, y, w, h, Boolean(fill))) {
      seen[idx] = 1;
      return;
    }
    seen[idx] = 1;
    if (fill) {
      buf[i] = fill[0];
      buf[i + 1] = fill[1];
      buf[i + 2] = fill[2];
      buf[i + 3] = fill[3];
    } else {
      buf[i + 3] = 0;
    }
    qx[tail] = x;
    qy[tail] = y;
    tail++;
  };

  for (let x = 0; x < w; x++) {
    enqueue(x, 0);
    enqueue(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    enqueue(0, y);
    enqueue(w - 1, y);
  }

  while (head < tail) {
    const x = qx[head];
    const y = qy[head];
    head++;
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }
}

async function scanEdgeFigma(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let edgeFigma = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (x >= 8 && y >= 8 && x < info.width - 8 && y < info.height - 8) continue;
      const i = (y * info.width + x) * info.channels;
      if (data[i + 3] < 20) continue;
      if (isFigmaPurple(data[i], data[i + 1], data[i + 2])) edgeFigma++;
    }
  }
  return edgeFigma;
}

async function processFile({ src, dest, kind, fillTeal = false, pad = PAD }) {
  const input = path.join(srcDir, src);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);
  const { width: w, height: h, channels: c } = info;

  flood(buf, w, h, c, fillTeal ? [...TEAL, 255] : null);

  const background = fillTeal
    ? { r: TEAL[0], g: TEAL[1], b: TEAL[2], alpha: 1 }
    : { r: 0, g: 0, b: 0, alpha: 0 };

  const out = path.join(outDir, dest);
  let pipeline = sharp(buf, { raw: { width: w, height: h, channels: c } }).extend({
    top: pad,
    bottom: pad,
    left: pad,
    right: pad,
    background,
  });

  if (kind === "png") {
    await pipeline.png({ compressionLevel: 9 }).toFile(out);
  } else {
    await pipeline.webp({ quality: 90, alphaQuality: 95, effort: 6 }).toFile(out);
  }

  const om = await sharp(out).metadata();
  const edgeFigma = await scanEdgeFigma(out);
  const padPctX = ((pad / om.width) * 100).toFixed(2);
  const padPctY = ((pad / om.height) * 100).toFixed(2);
  console.log(
    dest,
    `${om.width}x${om.height}`,
    `pad ${padPctX}% / ${padPctY}%`,
    "edgeFigma",
    edgeFigma,
    `${(fs.statSync(out).size / 1024).toFixed(0)}kb`
  );
  return om;
}

async function processIntro() {
  const input = path.join(srcDir, "intro.png");
  const m = await sharp(input).metadata();
  const size = m.width;
  const inset = 2.5;
  const r = size / 2 - inset;
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="white"/></svg>`
  );
  const out = path.join(outDir, "intro-plane.webp");
  await sharp(input)
    .ensureAlpha()
    .composite([{ input: svg, blend: "dest-in" }])
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(out);
  const om = await sharp(out).metadata();
  const edgeFigma = await scanEdgeFigma(out);
  console.log(
    "intro-plane.webp",
    `${om.width}x${om.height}`,
    "edgeFigma",
    edgeFigma,
    `${(fs.statSync(out).size / 1024).toFixed(0)}kb`
  );
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  await processFile({
    src: "hero-container.png",
    dest: "hero-devices.png",
    kind: "png",
    fillTeal: true,
  });
  await processFile({ src: "origins.png", dest: "origins.webp", kind: "webp" });
  await processFile({ src: "gen1.png", dest: "gen1-table.webp", kind: "webp" });
  await processFile({ src: "gen2.png", dest: "gen2-screens.webp", kind: "webp" });
  await processFile({
    src: "handoff.png",
    dest: "handoff-desktop.webp",
    kind: "webp",
  });
  await processFile({ src: "gen3.png", dest: "gen3-annotated.webp", kind: "webp" });
  await processIntro();
})();
