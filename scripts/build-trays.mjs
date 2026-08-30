/**
 * Compose the case-study "tray" images as TRANSPARENT PNGs.
 *
 * Replaces scripts/rebuild-image-mats.mjs. That script recoloured a mat that was
 * baked into opaque exports, so every palette change meant re-running it against
 * the source art. These trays carry an alpha channel instead: the mat is just
 * --mat behind the <img>, so the palette can move without touching a pixel.
 *
 * Geometry is lifted verbatim from the Figma dark frame
 * (node 7755:8907, file YMeIxSju7jExNqwN8W7RJA) as read through get_design_context.
 * Each layer records the box Figma clips to and the size the bitmap is drawn at
 * inside that box — those differ wherever Figma crops a fill, and the draw size
 * always matches the source asset's aspect ratio (a useful sanity check).
 *
 * Layer sources live outside the repo (large, never shipped):
 *   ~/Documents/portfolio-source-art/itinerary-layers
 * Override with LAYER_ART=/path. Preview without touching public/ via OUT_DIR=/path.
 *
 *   node scripts/build-trays.mjs
 */
import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

/** Output is rendered at this multiple of the Figma canvas, for retina. */
const SCALE = 2;

const layerDir =
  process.env.LAYER_ART ??
  join(homedir(), "Documents", "portfolio-source-art", "itinerary-layers");
const outDir =
  process.env.OUT_DIR ?? join(process.cwd(), "public", "images", "itinerary");

/**
 * Figma's group-level drop shadow, in unscaled px.
 * Effect(DROP_SHADOW, #4544455E, offset (0,4), radius 8).
 */
const GROUP_SHADOW = { dx: 0, dy: 4, blur: 8, rgb: [69, 68, 69], alpha: 0.37 };

/** Resolved --mat, for the one output that still has to be opaque (see `thumb`). */
const MAT = { r: 0x1f, g: 0x29, b: 0x37 };

/**
 * The trays.
 *
 * canvas  — the clipping frame, in Figma px. The tray renders transparent at this
 *           size and the component paints --mat behind it.
 * layers  — painted in order, first at the back.
 *   box   — {x,y,w,h} the layer's frame, relative to the canvas. Clips its bitmap.
 *   draw  — {w,h,dx,dy} the bitmap's size and offset INSIDE the box. dx/dy are
 *           often negative: Figma is showing a crop of a larger fill.
 *   border— optional px of solid black, drawn inside the box edge.
 * thumb  — optional flattened .webp for the case-study carousel card. site.ts
 *          points at a real file, so the tray that feeds a card has to emit one;
 *          the card is opaque, so this is the one place the mat is still baked.
 */
const trays = [
  {
    // Hero Image Container 1280x794; Screens frame at (130.5, 64), 1019x726.
    // Layer boxes below are container-relative (Screens origin already added).
    out: "hero-tray.png",
    canvas: { w: 1280, h: 794 },
    shadow: true,
    thumb: { out: "hero-tray.webp", width: 1280 },
    layers: [
      {
        src: "hero-device.png",
        box: { x: 130.5, y: 197, w: 540, h: 695 },
        draw: { w: 540, h: 765.6, dx: 0, dy: -0.28 },
        border: 2,
      },
      {
        src: "hero-browser.png",
        box: { x: 285.5, y: 64, w: 864, h: 1965 },
        draw: { w: 882, h: 1970.9, dx: -8.99, dy: -5.5 },
        border: 3,
      },
    ],
  },
  {
    // "Screen and caption" 1280x2289; IB-screenshot fills its box exactly
    // (909/2153 = 0.4222, and the asset is 1304/3088 = 0.4223), so no crop.
    out: "design-tray.png",
    canvas: { w: 1280, h: 2289 },
    layers: [
      {
        src: "ib-screenshot.png",
        box: { x: 185.5, y: 64, w: 909, h: 2153 },
        draw: { w: 909, h: 2153, dx: 0, dy: 0 },
      },
    ],
  },
  {
    // "Image and bullets" clips image 59 at 891x615. Rendering at the asset's
    // native width (scale 1376/891) keeps this one a pure crop — no resampling.
    out: "challenge-shot.png",
    canvas: { w: 891, h: 615 },
    scale: 1376 / 891,
    layers: [
      {
        src: "image59.png",
        box: { x: 0, y: 0, w: 891, h: 615 },
        draw: { w: 891, h: (891 * 1614) / 1376, dx: 0, dy: 0 },
      },
    ],
  },
  {
    // "Image and bullets" 1280x508 clips a 1867x1888 collage turned -26.99deg.
    // Figma reports the turned layer by its enclosing box, which works out to
    // 1867cos+1888sin = 2520.6 wide and 1867sin+1888cos = 2529.7 tall — the same
    // numbers the design gives, so dx/dy below position that enclosing box.
    out: "foundations-tray.png",
    canvas: { w: 1280, h: 508 },
    layers: [
      {
        src: "image60.png",
        box: { x: 0, y: 0, w: 1280, h: 508 },
        draw: { w: 1867, h: 1888, dx: -374, dy: -479 },
        rotate: -26.99,
      },
    ],
  },
];

/**
 * Whole-group Figma renders that need no compositing — only chrome removal.
 * Some groups (the wireframe collage) overflow their frame, so `contentsOnly`
 * renders drop half the content; the full render plus a chrome pass is correct.
 */
const flats = [
  { out: "wireframes-tray.webp", src: "wireframes-raw.png", quality: 86 },
];

/** Per-tray override of SCALE, so a tray can render at its asset's native size. */
let scale = SCALE;
const px = (v) => Math.round(v * scale);

/**
 * Clip a source buffer to a destination rect. Returns the sharp composite entry
 * plus the pre-crop needed when the source starts outside the destination, or
 * null when nothing lands inside.
 */
async function clipInto(buf, bufW, bufH, x, y, destW, destH) {
  const left = Math.round(x);
  const top = Math.round(y);

  const sx = Math.max(0, -left);
  const sy = Math.max(0, -top);
  const visW = Math.min(bufW - sx, destW - Math.max(0, left));
  const visH = Math.min(bufH - sy, destH - Math.max(0, top));
  if (visW <= 0 || visH <= 0) return null;

  const cropped =
    sx === 0 && sy === 0 && visW === bufW && visH === bufH
      ? buf
      : await sharp(buf)
          .extract({ left: sx, top: sy, width: visW, height: visH })
          .png()
          .toBuffer();

  return { input: cropped, left: Math.max(0, left), top: Math.max(0, top) };
}

/** Render one layer into its own box-sized, box-clipped buffer. */
async function renderLayer(layer) {
  const boxW = px(layer.box.w);
  const boxH = px(layer.box.h);

  let bitmap = await sharp(join(layerDir, layer.src))
    .resize(px(layer.draw.w), px(layer.draw.h), { fit: "fill" })
    .png()
    .toBuffer();

  let drawW = px(layer.draw.w);
  let drawH = px(layer.draw.h);

  // Figma rotates about the layer's centre and reports the enclosing bbox; sharp
  // does the same, so the rotated buffer's own size is what we place.
  if (layer.rotate) {
    const rotated = await sharp(bitmap)
      .rotate(layer.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    const rm = await sharp(rotated).metadata();
    bitmap = rotated;
    drawW = rm.width;
    drawH = rm.height;
  }

  const placed = await clipInto(
    bitmap,
    drawW,
    drawH,
    px(layer.draw.dx),
    px(layer.draw.dy),
    boxW,
    boxH,
  );

  const parts = placed ? [placed] : [];

  if (layer.border) {
    const b = px(layer.border);
    const outline = Buffer.from(
      `<svg width="${boxW}" height="${boxH}"><rect x="${b / 2}" y="${b / 2}" ` +
        `width="${boxW - b}" height="${boxH - b}" fill="none" ` +
        `stroke="#000" stroke-width="${b}"/></svg>`,
    );
    parts.push({ input: outline, left: 0, top: 0 });
  }

  return sharp({
    create: {
      width: boxW,
      height: boxH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(parts)
    .png()
    .toBuffer();
}

/**
 * Figma's own selection chrome — thin violet rules — rides along in whole-group
 * renders. It shows up as a row or column that is overwhelmingly one violet, so
 * find those lines and paint each from its clean neighbour. Deliberately strict:
 * these mockups contain blue UI rules that a loose test would eat.
 */
const CHROME = [151, 71, 255];
const CHROME_TOLERANCE = 70;
/** A line is chrome only if this much of it is violet. */
const CHROME_DENSITY = 0.25;

function isChrome(r, g, b) {
  return (
    Math.max(
      Math.abs(r - CHROME[0]),
      Math.abs(g - CHROME[1]),
      Math.abs(b - CHROME[2]),
    ) < CHROME_TOLERANCE
  );
}

async function stripFigmaChrome(file) {
  const img = sharp(file);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const px = (x, y) => (y * W + x) * C;
  const violet = (x, y) => {
    const i = px(x, y);
    return data[i + 3] > 10 && isChrome(data[i], data[i + 1], data[i + 2]);
  };

  const badRows = [];
  const badCols = [];
  for (let y = 0; y < H; y++) {
    let n = 0;
    for (let x = 0; x < W; x++) if (violet(x, y)) n++;
    if (n > W * CHROME_DENSITY) badRows.push(y);
  }
  for (let x = 0; x < W; x++) {
    let n = 0;
    for (let y = 0; y < H; y++) if (violet(x, y)) n++;
    if (n > H * CHROME_DENSITY) badCols.push(x);
  }
  if (badRows.length === 0 && badCols.length === 0) {
    return { buffer: await img.png().toBuffer(), rows: [], cols: [], W, H };
  }

  const rowSet = new Set(badRows);
  const colSet = new Set(badCols);
  const copy = (from, to) => {
    for (let k = 0; k < C; k++) data[to + k] = data[from + k];
  };

  for (const y of badRows) {
    let src = y + 1;
    while (src < H && rowSet.has(src)) src++;
    if (src >= H) {
      src = y - 1;
      while (src >= 0 && rowSet.has(src)) src--;
    }
    if (src < 0 || src >= H) continue;
    for (let x = 0; x < W; x++) copy(px(x, src), px(x, y));
  }
  for (const x of badCols) {
    let src = x + 1;
    while (src < W && colSet.has(src)) src++;
    if (src >= W) {
      src = x - 1;
      while (src >= 0 && colSet.has(src)) src--;
    }
    if (src < 0 || src >= W) continue;
    for (let y = 0; y < H; y++) copy(px(src, y), px(x, y));
  }

  return {
    buffer: await sharp(data, { raw: { width: W, height: H, channels: C } })
      .png()
      .toBuffer(),
    rows: badRows,
    cols: badCols,
    W,
    H,
  };
}

/** Figma applies the drop shadow to the composed group, not per layer. */
async function shadowFor(content, w, h) {
  const { rgb, alpha: a, blur } = GROUP_SHADOW;

  // joinChannel wants raw pixels, so keep the alpha mask un-encoded throughout.
  const mask = await sharp(content)
    .extractChannel("alpha")
    .blur(Math.max(0.3, px(blur) / 2))
    .linear(a, 0)
    .raw()
    .toBuffer();

  return sharp({
    create: {
      width: w,
      height: h,
      channels: 3,
      background: { r: rgb[0], g: rgb[1], b: rgb[2] },
    },
  })
    .joinChannel(mask, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();
}

async function buildTray(tray) {
  const W = px(tray.canvas.w);
  const H = px(tray.canvas.h);

  const placements = [];
  for (const layer of tray.layers) {
    const rendered = await renderLayer(layer);
    const placed = await clipInto(
      rendered,
      px(layer.box.w),
      px(layer.box.h),
      px(layer.box.x),
      px(layer.box.y),
      W,
      H,
    );
    if (placed) placements.push(placed);
  }

  const content = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(placements)
    .png()
    .toBuffer();

  const stack = [];
  if (tray.shadow) {
    stack.push({
      input: await shadowFor(content, W, H),
      left: px(GROUP_SHADOW.dx),
      top: px(GROUP_SHADOW.dy),
    });
  }
  stack.push({ input: content, left: 0, top: 0 });

  const out = join(outDir, tray.out);
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(stack)
    .png({ compressionLevel: 9 })
    .toFile(out);

  if (tray.thumb) {
    const flat = await sharp({
      create: { width: W, height: H, channels: 4, background: { ...MAT, alpha: 1 } },
    })
      .composite([{ input: out }])
      .png()
      .toBuffer();
    await sharp(flat)
      .resize(tray.thumb.width)
      .webp({ quality: 82 })
      .toFile(join(outDir, tray.thumb.out));
  }

  const meta = await sharp(out).metadata();
  const stats = await sharp(out).stats();
  return {
    out: tray.out,
    w: meta.width,
    h: meta.height,
    opaque: stats.isOpaque,
    thumb: tray.thumb?.out,
  };
}

if (!existsSync(layerDir)) {
  console.error(`Layer art not found: ${layerDir}\nSet LAYER_ART=/path`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

console.log(`Transparent trays @${SCALE}x → ${outDir}`);
for (const flat of flats) {
  const { buffer, rows, cols, W, H } = await stripFigmaChrome(
    join(layerDir, flat.src),
  );
  await sharp(buffer)
    .webp({ quality: flat.quality ?? 86 })
    .toFile(join(outDir, flat.out));
  const cleaned = rows.length + cols.length;
  console.log(
    `  ${flat.out.padEnd(24)} ${W}x${H}  chrome lines removed=${cleaned}` +
      (cleaned ? ` (rows ${rows.join(",") || "-"} / cols ${cols.join(",") || "-"})` : ""),
  );
}

for (const tray of trays) {
  scale = tray.scale ?? SCALE;
  const r = await buildTray(tray);
  console.log(
    `  ${r.out.padEnd(24)} ${r.w}x${r.h}  transparent=${!r.opaque}` +
      (r.thumb ? `  (+ ${r.thumb})` : ""),
  );
}
