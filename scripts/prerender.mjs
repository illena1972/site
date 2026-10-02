import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");
const indexPath = path.join(distDir, "index.html");
const serverEntry = path.join(serverDir, "entry-server.js");

const template = await readFile(indexPath, "utf8");
const { render } = await import(pathToFileURL(serverEntry));
const { html } = render();

if (!html || !html.includes("BioClean Workwear")) {
  throw new Error("Prerender failed: rendered HTML is empty or unexpected.");
}

const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${html}</div>`,
);

if (output === template) {
  throw new Error("Prerender failed: root placeholder was not found.");
}

await writeFile(indexPath, output, "utf8");
await rm(serverDir, { recursive: true, force: true });