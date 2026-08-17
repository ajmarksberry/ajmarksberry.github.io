const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const NAVY = { r: 17, g: 24, b: 39 };
const FIGMA = [151, 71, 255];
const src = path.join(__dirname, "gen3-export.png");
const dest = path.join(__dirname, "..", "public", "images", "taap", "gen3-annotated.png");

function dist(r, g, b, t) {
  return Math.max(Math.abs(r - t[0]), Math.abs(g - t[1]), Math.abs(b - t[2]));
}

function isFigmaPurple(r, g, b) {
  return (
    dist(r, g, b, FIGMA) < 55 ||
    (b > 200 && r > 90 && r < 230 && g < 160 && b - g > 60 && b - r > 20)
  );
}

(async () => {
  const { data, info } = await sharp(src)
    .flatten({ background: NAVY })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buf = Buffer.from(data);
  const { width: w, height: h, channels: c } = info;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const rim = Math.min(x, y, w - 1 - x, h - 1 - y);
      if (rim > 6) continue;
      const i = (y * w + x) * c;
      if (!isFigmaPurple(buf[i], buf[i + 1], buf[i + 2])) continue;
      buf[i] = NAVY.r;
      buf[i + 1] = NAVY.g;
      buf[i + 2] = NAVY.b;
    }
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(buf, { raw: { width: w, height: h, channels: c } })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  const om = await sharp(dest).metadata();
  console.log(
    path.basename(dest),
    `${om.width}x${om.height}`,
    `alpha=${om.hasAlpha}`,
    `${(fs.statSync(dest).size / 1024).toFixed(0)}kb`
  );
})();
