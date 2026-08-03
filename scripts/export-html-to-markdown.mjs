import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { JSDOM } from "jsdom";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const cwd = process.cwd();
const inputDir = path.resolve(cwd, process.argv[2] ?? "build");
const outputDir = path.resolve(cwd, process.argv[3] ?? ".markdown");

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(fullPath);
      return entry.name.endsWith(".html") ? [fullPath] : [];
    }),
  );
  return files.flat();
}

function toRoute(filePath) {
  const relativePath = path.relative(inputDir, filePath).replace(/\\/g, "/");
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/\.html$/, "")}`;
}

function toOutputPath(filePath) {
  const relativePath = path.relative(inputDir, filePath).replace(/\\/g, "/");
  return path.join(outputDir, relativePath.replace(/\.html$/, ".md"));
}

function createTurndownService() {
  const service = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
    headingStyle: "atx",
    hr: "---",
    linkStyle: "inlined",
  });

  service.use(gfm);

  service.addRule("shiki-pre", {
    filter(node) {
      return node.nodeName === "PRE";
    },
    replacement(_content, node) {
      const code = node.querySelector("code");
      const languageClass = code?.className
        ?.split(/\s+/)
        .find((className) => className.startsWith("language-"));
      const language = languageClass ? languageClass.replace(/^language-/, "") : "";
      const text =
        code?.textContent?.replace(/\n+$/, "") ?? node.textContent?.replace(/\n+$/, "") ?? "";
      return `\n\n\`\`\`${language}\n${text}\n\`\`\`\n\n`;
    },
  });

  service.addRule("shiki-inline-code", {
    filter(node) {
      return node.nodeName === "CODE" && node.parentNode?.nodeName !== "PRE";
    },
    replacement(_content, node) {
      const text = node.textContent ?? "";
      return `\`${text}\``;
    },
  });

  service.addRule("block-link", {
    filter(node) {
      if (node.nodeName !== "A") return false;
      return Array.from(node.childNodes).some((child) =>
        ["DIV", "H1", "H2", "H3", "H4", "H5", "H6", "P", "SECTION"].includes(child.nodeName),
      );
    },
    replacement(content, node) {
      const href = node.getAttribute("href") ?? "";
      const body = content.trim();
      return body ? `${body}\n\nLink: ${href}\n\n` : "";
    },
  });

  service.addRule("remove-hidden", {
    filter(node) {
      const style = node.getAttribute?.("style") ?? "";
      return style.includes("display:none");
    },
    replacement() {
      return "";
    },
  });

  return service;
}

function pickContent(document) {
  return document.querySelector(".prose") ?? document.querySelector("main") ?? document.body;
}

function toFrontmatterValue(value) {
  return JSON.stringify(value);
}

async function convertFile(filePath) {
  const html = await readFile(filePath, "utf8");
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const content = pickContent(document).cloneNode(true);

  content.querySelectorAll("script, style, noscript").forEach((node) => node.remove());
  content.querySelectorAll('[aria-hidden="true"]').forEach((node) => node.remove());
  content.querySelectorAll("[data-footnote-backref]").forEach((node) => node.remove());
  content.querySelectorAll("span").forEach((node) => {
    if (node.textContent?.trim() === "→") node.remove();
  });

  const markdown = createTurndownService()
    .turndown(content.innerHTML)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const title = document.querySelector("title")?.textContent?.trim();
  const description = document
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();
  const route = toRoute(filePath);

  const frontmatter = [
    "---",
    `title: ${toFrontmatterValue(title ?? "")}`,
    `route: ${toFrontmatterValue(route)}`,
    description ? `description: ${toFrontmatterValue(description)}` : null,
    "---",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `${frontmatter}\n\n${markdown}\n`;
}

async function main() {
  const htmlFiles = await listHtmlFiles(inputDir);

  for (const filePath of htmlFiles) {
    const outputPath = toOutputPath(filePath);
    const markdown = await convertFile(filePath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, markdown);
  }

  console.log(`Converted ${htmlFiles.length} HTML files from ${inputDir} to ${outputDir}`);
}

await main();
