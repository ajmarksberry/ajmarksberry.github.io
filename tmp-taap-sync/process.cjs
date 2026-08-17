const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = __dirname;
const outDir = path.join(__dirname, "..", "public", "images", "taap");

const CREAM = { r: 250, g: 249, b: 245 };
const TEAL = { r: 88, g: 194, b: 162 };
const NAVY = { r: 17, g: 24, b: 39 };
const FIGMA = [151, 71, 255];

function dist(r, g, b, t) {
  return Math.max(Math.abs(r - t[0]), Math.abs(g - t[1]), Math.abs(b - t[2]));
}

function isFigmaPurple(r, g, b) {
  return (
    dist(r, g, b, FIGMA) < 55 ||
    (b > 200 && r > 90 && r < 230 && g < 160 && b - g > 60 && b - r > 20)
  );
}

async function flattenWebp({ src, dest, bg, pad = 0, paintCream = false, keepAlpha = false }) {
  const input = path.join(srcDir, src);
  const pipeline = keepAlpha
    ? sharp(input).ensureAlpha()
    : sharp(input).flatten({ background: bg }).removeAlpha();
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });

  const buf = Buffer.from(data);
  const { width: w, height: h, channels: c } = info;
  const fill = [bg.r, bg.g, bg.b];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const rim = Math.min(x, y, w - 1 - x, h - 1 - y);
      if (rim > 6) continue;
      const i = (y * w + x) * c;
      const r = buf[i];
      const g = buf[i + 1];
      const b = buf[i + 2];
      const a = c === 4 ? buf[i + 3] : 255;
      if (a < 20) continue;
      const paint =
        isFigmaPurple(r, g, b) ||
        (paintCream && dist(r, g, b, [CREAM.r, CREAM.g, CREAM.b]) <= 14);
      if (!paint) continue;
      buf[i] = fill[0];
      buf[i + 1] = fill[1];
      buf[i + 2] = fill[2];
      if (c === 4) buf[i + 3] = 255;
    }
  }

  const out = path.join(outDir, dest);
  let img = sharp(buf, { raw: { width: w, height: h, channels: c } });
  if (pad > 0) {
    img = img.extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: keepAlpha ? { ...bg, alpha: 1 } : bg,
    });
  }

  await img.webp({ quality: 95, alphaQuality: 100, effort: 6 }).toFile(out);

  const om = await sharp(out).metadata();
  console.log(
    dest,
    `${om.width}x${om.height}`,
    `alpha=${om.hasAlpha}`,
    `${(fs.statSync(out).size / 1024).toFixed(0)}kb`
  );
  return om;
}

async function processIntro() {
  const input = path.join(srcDir, "intro.png");
  const { width, height } = await sharp(input).metadata();
  const size = Math.min(width, height);
  const r = size / 2 - 1;
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="white"/></svg>`
  );
  const out = path.join(outDir, "intro-plane.webp");
  await sharp(input)
    .ensureAlpha()
    .composite([{ input: svg, blend: "dest-in" }])
    .webp({ quality: 95, alphaQuality: 100, effort: 6 })
    .toFile(out);
  const om = await sharp(out).metadata();
  console.log(
    "intro-plane.webp",
    `${om.width}x${om.height}`,
    `alpha=${om.hasAlpha}`,
    `${(fs.statSync(out).size / 1024).toFixed(0)}kb`
  );
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  await flattenWebp({
    src: "hero.png",
    dest: "hero-devices.webp",
    bg: TEAL,
    paintCream: true,
  });
  await processIntro();
  await flattenWebp({ src: "origins.png", dest: "origins.webp", bg: NAVY });
  await flattenWebp({
    src: "gen2.png",
    dest: "gen2-screens.webp",
    bg: NAVY,
    paintCream: true,
  });
  await flattenWebp({
    src: "handoff.png",
    dest: "handoff-desktop.webp",
    bg: NAVY,
    paintCream: true,
  });
  await flattenWebp({ src: "gen3.png", dest: "gen3-annotated.webp", bg: NAVY });
})();
