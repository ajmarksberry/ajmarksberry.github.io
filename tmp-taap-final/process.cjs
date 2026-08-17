const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = __dirname;
const outDir = path.join(__dirname, "..", "public", "images", "taap");

const CREAM = { r: 250, g: 249, b: 245 };
const TEAL = { r: 88, g: 194, b: 162 };
const NAVY = { r: 17, g: 24, b: 39 };
const FIGMA = [151, 71, 255];
const PAD = 48;

function dist(r, g, b, t) {
  return Math.max(Math.abs(r - t[0]), Math.abs(g - t[1]), Math.abs(b - t[2]));
}

function isFigmaPurple(r, g, b) {
  return (
    dist(r, g, b, FIGMA) < 55 ||
    (b > 200 && r > 90 && r < 230 && g < 160 && b - g > 60 && b - r > 20)
  );
}

async function save({ src, dest, bg, pad = PAD, paintCream = false }) {
  const input = path.join(srcDir, src);
  const { data, info } = await sharp(input)
    .flatten({ background: bg })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

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
      const paint =
        isFigmaPurple(r, g, b) ||
        (paintCream && dist(r, g, b, [CREAM.r, CREAM.g, CREAM.b]) <= 14);
      if (!paint) continue;
      buf[i] = fill[0];
      buf[i + 1] = fill[1];
      buf[i + 2] = fill[2];
    }
  }

  const out = path.join(outDir, dest);
  await sharp(buf, { raw: { width: w, height: h, channels: c } })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: bg,
    })
    .webp({ quality: 95, effort: 6 })
    .toFile(out);

  const om = await sharp(out).metadata();
  console.log(
    dest,
    `${om.width}x${om.height}`,
    `${(fs.statSync(out).size / 1024).toFixed(0)}kb`
  );
  return om;
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  await save({
    src: "hero-container.png",
    dest: "hero-devices.webp",
    bg: TEAL,
    paintCream: true,
  });
  await save({ src: "intro.png", dest: "intro-plane.webp", bg: CREAM, pad: 0 });
  await save({ src: "origins.png", dest: "origins.webp", bg: NAVY });
  await save({ src: "gen1.png", dest: "gen1-table.webp", bg: NAVY });
  await save({
    src: "gen2-panel.png",
    dest: "gen2-screens.webp",
    bg: NAVY,
    paintCream: true,
    pad: 0,
  });
  await save({
    src: "handoff-panel.png",
    dest: "handoff-desktop.webp",
    bg: NAVY,
    paintCream: true,
    pad: 0,
  });
  await save({ src: "gen3.png", dest: "gen3-annotated.webp", bg: NAVY });
})();
