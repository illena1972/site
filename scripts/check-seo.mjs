import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const html = await readFile(indexPath, "utf8");

const requiredText = [
  "Учет спецодежды и СИЗ на предприятии",
  "BioClean Workwear — программа учета спецодежды",
  "Возможности программы учета спецодежды и СИЗ",
  "Тарифы на систему учета спецодежды",
  "Как вести учет спецодежды и СИЗ на предприятии",
];

if (html.includes('<div id="root"></div>')) {
  throw new Error("SEO check failed: dist/index.html has an empty root element.");
}

for (const text of requiredText) {
  if (!html.includes(text)) {
    throw new Error(`SEO check failed: missing text "${text}" in dist/index.html.`);
  }
}

console.log("SEO check passed: dist/index.html contains prerendered page text.");
