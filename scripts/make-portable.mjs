import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const destDir = join(root, "AJM-Portfolio");
const zipPath = join(root, "AJM-Portfolio.zip");
const portableJs = readFileSync(join(root, "scripts/portable.js"), "utf8");

const routes = [
  "/",
  "/about/",
  "/contact/",
  "/projects/",
  "/projects/taap/",
  "/projects/taap-itinerary/",
  "/projects/reach-ai/",
  "/projects/reach-booking/",
];

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function depthOf(file) {
  const rel = relative(destDir, file).split(/[/\\]/).filter(Boolean);
  return Math.max(0, rel.length - 1);
}

function prefixFor(depth) {
  return depth === 0 ? "./" : "../".repeat(depth);
}

function rewriteHtml(html, depth) {
  const prefix = prefixFor(depth);

  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<link[^>]+rel="preload"[^>]*as="script"[^>]*>/gi, "");
  html = html.replace(/\scrossorigin=""/g, "");

  html = html.replace(/(href|src)="\/_next\//g, `$1="${prefix}_next/`);
  html = html.replace(/(href|src)="\/images\//g, `$1="${prefix}images/`);
  html = html.replace(/(href|src)="\/(file|globe|next|vercel|window)\.svg"/g, `$1="${prefix}$2.svg"`);
  html = html.replace(/href="\/favicon\.ico[^"]*"/g, `href="${prefix}favicon.ico"`);

  for (const route of routes.sort((a, b) => b.length - a.length)) {
    const target =
      route === "/" ? `${prefix}index.html` : `${prefix}${route.slice(1)}index.html`;
    const escaped = route.replaceAll("/", "\\/");
    html = html.replaceAll(new RegExp(`href="${escaped}"`, "g"), `href="${target}"`);
    if (route !== "/") {
      const noSlash = route.slice(0, -1);
      html = html.replaceAll(`href="${noSlash}"`, `href="${target}"`);
    }
  }

  const scriptTag = `<script src="${prefix}portable.js"></script>`;
  if (html.includes("</body>")) {
    html = html.replace("</body>", `${scriptTag}\n</body>`);
  } else {
    html += scriptTag;
  }

  return html;
}

rmSync(destDir, { recursive: true, force: true });
mkdirSync(destDir, { recursive: true });
cpSync(outDir, destDir, { recursive: true });
writeFileSync(join(destDir, "portable.js"), portableJs);

for (const file of walk(destDir)) {
  const name = file.split(/[/\\]/).pop() || "";
  if (name.startsWith("__next.") || name.endsWith(".txt") || name === ".DS_Store") {
    rmSync(file, { force: true });
  }
}

for (const file of walk(destDir)) {
  if (!file.endsWith(".html")) continue;
  const depth = depthOf(file);
  const rewritten = rewriteHtml(readFileSync(file, "utf8"), depth);
  writeFileSync(file, rewritten);
}

writeFileSync(
  join(destDir, "README.txt"),
  [
    "AJ Marksberry portfolio — offline copy",
    "",
    "Open index.html in your browser to view the site.",
    "All pages, images, and styles are in this folder.",
    "",
  ].join("\n")
);

rmSync(zipPath, { force: true });
execSync(`zip -r -q "${zipPath}" "AJM-Portfolio"`, { cwd: root });

console.log(`Wrote ${destDir}`);
console.log(`Wrote ${zipPath}`);
