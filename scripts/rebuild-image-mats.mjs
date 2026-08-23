/**
 * Rebuild the case-study "tray" images against the neutral mat.
 *
 * The mat is baked into the source pixels (the exports are fully opaque), so
 * changing it is a recolour, not a re-composite. We desaturate everything in
 * the mat's hue family and remap its lightness onto the target grey — that
 * keeps drop shadows and vignettes intact instead of stamping them flat, and
 * leaves content in other hues (orange charts, blue UI) alone.
 *
 * Sources live outside the repo (large, never shipped):
 *   ~/Documents/portfolio-source-art/itinerary-final
 * Override with SOURCE_ART=/path. Preview without touching public/ via OUT_DIR=/path.
 *
 *   node scripts/rebuild-image-mats.mjs
 */
import { existsSync, mkdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

/** Keep in sync with --mat in src/app/globals.css. */
const MAT = [0x21, 0x25, 0x2e];

const sourceDir =
  process.env.SOURCE_ART ??
  join(homedir(), "Documents", "portfolio-source-art", "itinerary-final");
const outDir =
  process.env.OUT_DIR ?? join(process.cwd(), "public", "images", "itinerary");

/** Figma's selection chrome bleeds into some exports as a purple border. */
const FIGMA_PURPLE = [151, 71, 255];

function isFigmaPurple(r, g, b) {
  const dist = Math.max(
    Math.abs(r - FIGMA_PURPLE[0]),
    Math.abs(g - FIGMA_PURPLE[1]),
    Math.abs(b - FIGMA_PURPLE[2]),
  );
  return (
    dist < 55 ||
    (b > 200 && r > 90 && r < 230 && g < 160 && b - g > 60 && b - r > 20)
  );
}

function rgb2hsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, mx === 0 ? 0 : d / mx, mx];
}

function hueDist(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

async function rebuild({ src, dest, mat, hueTol = 32, satMin = 0.08, quality = 86 }) {
  const { data, info } = await sharp(join(sourceDir, src))
    .flatten({ background: { r: MAT[0], g: MAT[1], b: MAT[2] } })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;

  const [matH, , matV] = rgb2hsv(...mat);
  const targetV = Math.max(...MAT) / 255;

  for (let i = 0; i < data.length; i += ch) {
    if (isFigmaPurple(data[i], data[i + 1], data[i + 2])) {
      [data[i], data[i + 1], data[i + 2]] = MAT;
      continue;
    }

    const [h, s, v] = rgb2hsv(data[i], data[i + 1], data[i + 2]);
    if (s < satMin || hueDist(h, matH) > hueTol) continue;

    // Confidence that this pixel is mat, tapering off at the hue boundary.
    const w = Math.min(1, (hueTol - hueDist(h, matH)) / (hueTol * 0.5));
    // Preserve relative lightness: a shadow at 0.7x the mat stays 0.7x the grey.
    const scale = (matV === 0 ? 1 : v / matV) * targetV / (targetV || 1);

    for (let c = 0; c < 3; c++) {
      const neutral = Math.max(0, Math.min(255, MAT[c] * scale));
      data[i + c] = Math.round(data[i + c] * (1 - w) + neutral * w);
    }
  }

  mkdirSync(outDir, { recursive: true });
  const out = join(outDir, dest);
  await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
    .webp({ quality, effort: 6 })
    .toFile(out);

  const { width, height } = await sharp(out).metadata();
  console.log(
    `  ${dest.padEnd(24)} ${width}x${height}  ${Math.round(statSync(out).size / 1024)}kb`,
  );
}

/** Mat colours as originally flattened; see the archive README. */
const jobs = [
  { src: "hero-tray.png", dest: "hero-tray.webp", mat: [154, 208, 214] },
  { src: "challenge-shot.png", dest: "challenge-shot.webp", mat: [244, 219, 215] },
  { src: "foundations-tray.png", dest: "foundations-tray.webp", mat: [105, 191, 201] },
  { src: "design-tray.png", dest: "design-tray.webp", mat: [159, 217, 200], quality: 82 },
];

if (!existsSync(sourceDir)) {
  console.error(`Source art not found: ${sourceDir}`);
  console.error("Set SOURCE_ART to the archive directory and retry.");
  process.exit(1);
}

const hex = `#${MAT.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
console.log(`Mat ${hex} → ${outDir}`);
for (const job of jobs) await rebuild(job);
