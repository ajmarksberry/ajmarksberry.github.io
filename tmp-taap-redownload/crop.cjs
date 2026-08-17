const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = "tmp-taap-redownload";
const outDir = "public/images/taap";
const CROP = 8;
const CREAM = [250, 249, 245];
const TEAL = [88, 194, 162];
const FIGMA = [151, 71, 255];

function dist(r, g, b, t) {
  return Math.max(Math.abs(r - t[0]), Math.abs(g - t[1]), Math.abs(b - t[2]));
}

async function process({ src, dest, kind, crop = CROP, fillTeal = false }) {
  const m = await sharp(path.join(srcDir, src)).metadata();
  const { data, info } = await sharp(path.join(srcDir, src))
    .ensureAlpha()
    .extract({
      left: crop,
      top: crop,
      width: m.width - crop * 2,
      height: m.height - crop * 2,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);
  const w = info.width;
  const h = info.height;
  const c = info.channels;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const rim = Math.min(x, y, w - 1 - x, h - 1 - y);
      if (rim > 3) continue;
      const i = (y * w + x) * c;
      const r = buf[i];
      const g = buf[i + 1];
      const b = buf[i + 2];
      const figma =
        dist(r, g, b, FIGMA) < 55 ||
        (b > 200 && r > 90 && r < 230 && g < 160 && b - g > 60 && b - r > 20);
      const cream = dist(r, g, b, CREAM) <= 12;
      if (!figma && !cream) continue;
      if (fillTeal) {
        buf[i] = TEAL[0];
        buf[i + 1] = TEAL[1];
        buf[i + 2] = TEAL[2];
        buf[i + 3] = 255;
      } else {
        buf[i + 3] = 0;
      }
    }
  }

  const out = path.join(outDir, dest);
  const writer = sharp(buf, { raw: { width: w, height: h, channels: c } });
  if (kind === "png") await writer.png({ compressionLevel: 9 }).toFile(out);
  else await writer.webp({ quality: 90, alphaQuality: 95, effort: 6 }).toFile(out);

  const om = await sharp(out).metadata();
  const { data: d2, info: i2 } = await sharp(out)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let edgeFigma = 0;
  for (let y = 0; y < i2.height; y++) {
    for (let x = 0; x < i2.width; x++) {
      if (x >= 6 && y >= 6 && x < i2.width - 6 && y < i2.height - 6) continue;
      const i = (y * i2.width + x) * i2.channels;
      if (d2[i + 3] < 20) continue;
      if (dist(d2[i], d2[i + 1], d2[i + 2], FIGMA) < 48) edgeFigma++;
    }
  }
  console.log(
    dest,
    `${om.width}x${om.height}`,
    "edgeFigma",
    edgeFigma,
    `${(fs.statSync(out).size / 1024).toFixed(0)}kb`
  );
}

(async () => {
  await process({ src: "gen1-export.png", dest: "gen1-table.webp", kind: "webp" });
  await process({ src: "gen2-group.png", dest: "gen2-screens.webp", kind: "webp" });
  await process({ src: "gen3-export.png", dest: "gen3-annotated.webp", kind: "webp" });
  await process({ src: "handoff-export.png", dest: "handoff-desktop.webp", kind: "webp" });
  await process({ src: "origins-export.png", dest: "origins.webp", kind: "webp" });
  await process({
    src: "hero-container.png",
    dest: "hero-devices.png",
    kind: "png",
    fillTeal: true,
  });
})();
