/**
 * Cut the baked background out of the circular photos.
 *
 * These were exported as opaque squares: the photo masked to a circle, corners
 * filled with the old cream page colour (#fbf9f5). On a dark page that reads as
 * a white box. CSS `rounded-full` hides it, but the asset still carries the
 * cream — including a one-pixel ring at the boundary where the mask was
 * antialiased against it.
 *
 * This replaces that with a real alpha channel: transparent outside the circle,
 * antialiased across a one-pixel band, and inset slightly so the cream ring is
 * cut rather than blended. The result sits on any background.
 *
 *   node scripts/round-circle-images.mjs
 */
import { statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

/** Inset in px, at the asset's own resolution — enough to drop the cream ring. */
const INSET = 2;

const files = [
  "reach/intro-salon.webp",
  "reach/persona-emily.webp",
  "booking/intro-salon.webp",
  "booking/persona.webp",
  "taap/intro-plane.webp",
  "itinerary/intro-photo.webp",
];

const root = join(process.cwd(), "public", "images");

async function round(rel) {
  const path = join(root, rel);
  const { data, info } = await sharp(path)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(cx, cy) - INSET;

  const out = Buffer.alloc(w * h * 4);
  let clipped = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const src = (y * w + x) * info.channels;
      const dst = (y * w + x) * 4;
      out[dst] = data[src];
      out[dst + 1] = data[src + 1];
      out[dst + 2] = data[src + 2];

      // Distance from centre, softened across one pixel so the rim stays smooth.
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const alpha = Math.max(0, Math.min(1, radius + 0.5 - d));
      out[dst + 3] = Math.round(alpha * 255);
      if (alpha < 1) clipped++;
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(path);

  const kb = Math.round(statSync(path).size / 1024);
  console.log(
    `  ${rel.padEnd(26)} ${w}x${h}  r=${radius}  ${(100 * clipped / (w * h)).toFixed(1)}% cut  ${kb}kb`,
  );
}

console.log(`Cutting circles (inset ${INSET}px) in ${root}`);
for (const f of files) await round(f);
