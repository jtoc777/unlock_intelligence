import fs from "fs";
import path from "path";

export interface WikiFile {
  /** File name without extension */
  name: string;
  /** Display-friendly name (date prefix stripped, hyphens replaced, capitalized) */
  displayName: string;
  /** URL path segments relative to /cockpit/wiki/ — e.g. ["strategy", "pricing-strategy.md"] */
  segments: string[];
}

export interface WikiFolder {
  /** Folder name */
  name: string;
  /** Display-friendly name */
  displayName: string;
  /** Number of .md files (recursive) */
  fileCount: number;
  /** Direct .md file children */
  files: WikiFile[];
  /** Nested sub-folders */
  subfolders: WikiFolder[];
}

export interface WikiTree {
  folders: WikiFolder[];
}

function formatName(raw: string): string {
  return raw
    .replace(/\.md$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/-/g, " ");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isHidden(name: string): boolean {
  return (
    name.startsWith("_") ||
    name.startsWith(".") ||
    name.toLowerCase() === "readme.md"
  );
}

function readFolder(dirPath: string, parentSegments: string[]): WikiFolder | null {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return null;

  const folderName = path.basename(dirPath);
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const files: WikiFile[] = [];
  const subfolders: WikiFolder[] = [];

  for (const entry of entries) {
    if (isHidden(entry.name)) continue;

    if (entry.isDirectory()) {
      const sub = readFolder(
        path.join(dirPath, entry.name),
        [...parentSegments, entry.name],
      );
      if (sub && (sub.files.length > 0 || sub.subfolders.length > 0)) {
        subfolders.push(sub);
      }
    } else if (entry.name.endsWith(".md")) {
      files.push({
        name: entry.name,
        displayName: capitalize(formatName(entry.name)),
        segments: [...parentSegments, entry.name],
      });
    }
  }

  files.sort((a, b) => a.name.localeCompare(b.name));
  subfolders.sort((a, b) => a.name.localeCompare(b.name));

  const fileCount = files.length + subfolders.reduce((sum, sf) => sum + sf.fileCount, 0);

  return {
    name: folderName,
    displayName: capitalize(formatName(folderName)),
    fileCount,
    files,
    subfolders,
  };
}

export function getWikiTree(): WikiTree {
  const knowledgeDir = path.join(process.cwd(), "knowledge");
  if (!fs.existsSync(knowledgeDir)) return { folders: [] };

  const entries = fs.readdirSync(knowledgeDir, { withFileTypes: true });
  const folders: WikiFolder[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || isHidden(entry.name)) continue;
    const folder = readFolder(path.join(knowledgeDir, entry.name), [entry.name]);
    if (folder && (folder.files.length > 0 || folder.subfolders.length > 0)) {
      folders.push(folder);
    }
  }

  folders.sort((a, b) => a.name.localeCompare(b.name));
  return { folders };
}
