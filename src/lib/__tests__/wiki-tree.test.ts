import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fs module before importing wiki-tree
vi.mock("fs", () => {
  const mockFs: Record<string, unknown> = {};

  // Simulated file system structure:
  // knowledge/
  //   strategy/
  //     icp-and-buyer-personas.md
  //     pricing-strategy.md
  //     _template.md          <-- should be excluded
  //   learnings/
  //     2026-04-02-design-review.md
  //     .hidden-file.md       <-- should be excluded
  //   curriculum/
  //     README.md             <-- should be excluded (README)
  //     module-1/
  //       run-of-show.md
  //   empty-dir/              <-- should be excluded (no .md files)

  const fileSystem: Record<string, { isDir: boolean }> = {
    "knowledge": { isDir: true },
    "knowledge/strategy": { isDir: true },
    "knowledge/strategy/icp-and-buyer-personas.md": { isDir: false },
    "knowledge/strategy/pricing-strategy.md": { isDir: false },
    "knowledge/strategy/_template.md": { isDir: false },
    "knowledge/learnings": { isDir: true },
    "knowledge/learnings/2026-04-02-design-review.md": { isDir: false },
    "knowledge/learnings/.hidden-file.md": { isDir: false },
    "knowledge/curriculum": { isDir: true },
    "knowledge/curriculum/README.md": { isDir: false },
    "knowledge/curriculum/module-1": { isDir: true },
    "knowledge/curriculum/module-1/run-of-show.md": { isDir: false },
    "knowledge/empty-dir": { isDir: true },
  };

  function normalizePath(p: string): string {
    // Strip CWD prefix and leading slash
    return p.replace(/.*?knowledge/, "knowledge").replace(/\\/g, "/");
  }

  function getChildren(dirPath: string): string[] {
    const normalized = normalizePath(dirPath);
    const prefix = normalized + "/";
    const children = new Set<string>();
    for (const key of Object.keys(fileSystem)) {
      if (key.startsWith(prefix)) {
        const rest = key.slice(prefix.length);
        const firstSegment = rest.split("/")[0];
        children.add(firstSegment);
      }
    }
    return Array.from(children);
  }

  mockFs.existsSync = vi.fn((p: string) => {
    const norm = normalizePath(p);
    return norm in fileSystem;
  });

  mockFs.statSync = vi.fn((p: string) => {
    const norm = normalizePath(p);
    const entry = fileSystem[norm];
    return {
      isDirectory: () => entry?.isDir ?? false,
      isFile: () => !entry?.isDir,
    };
  });

  mockFs.readdirSync = vi.fn((p: string, _opts?: unknown) => {
    const norm = normalizePath(p);
    const children = getChildren(norm);
    return children.map((name) => {
      const childPath = norm + "/" + name;
      const isDir = fileSystem[childPath]?.isDir ?? false;
      return {
        name,
        isDirectory: () => isDir,
        isFile: () => !isDir,
      };
    });
  });

  return { default: mockFs, ...mockFs };
});

import { getWikiTree } from "../wiki-tree";

describe("getWikiTree", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns folders sorted alphabetically", () => {
    const tree = getWikiTree();
    const names = tree.folders.map((f) => f.name);
    expect(names).toEqual(["curriculum", "learnings", "strategy"]);
  });

  it("excludes empty directories", () => {
    const tree = getWikiTree();
    const names = tree.folders.map((f) => f.name);
    expect(names).not.toContain("empty-dir");
  });

  it("excludes files starting with underscore", () => {
    const tree = getWikiTree();
    const strategy = tree.folders.find((f) => f.name === "strategy");
    const fileNames = strategy?.files.map((f) => f.name) ?? [];
    expect(fileNames).not.toContain("_template.md");
  });

  it("excludes files starting with dot", () => {
    const tree = getWikiTree();
    const learnings = tree.folders.find((f) => f.name === "learnings");
    const fileNames = learnings?.files.map((f) => f.name) ?? [];
    expect(fileNames).not.toContain(".hidden-file.md");
  });

  it("excludes README.md files", () => {
    const tree = getWikiTree();
    const curriculum = tree.folders.find((f) => f.name === "curriculum");
    const fileNames = curriculum?.files.map((f) => f.name) ?? [];
    expect(fileNames).not.toContain("README.md");
  });

  it("counts .md files recursively", () => {
    const tree = getWikiTree();
    const strategy = tree.folders.find((f) => f.name === "strategy");
    expect(strategy?.fileCount).toBe(2);

    const curriculum = tree.folders.find((f) => f.name === "curriculum");
    // module-1/run-of-show.md = 1
    expect(curriculum?.fileCount).toBe(1);
  });

  it("strips date prefix and hyphens for display names", () => {
    const tree = getWikiTree();
    const learnings = tree.folders.find((f) => f.name === "learnings");
    const file = learnings?.files.find(
      (f) => f.name === "2026-04-02-design-review.md",
    );
    expect(file?.displayName).toBe("Design review");
  });

  it("builds correct URL segments for nested files", () => {
    const tree = getWikiTree();
    const curriculum = tree.folders.find((f) => f.name === "curriculum");
    const subfolder = curriculum?.subfolders.find(
      (sf) => sf.name === "module-1",
    );
    const file = subfolder?.files.find((f) => f.name === "run-of-show.md");
    expect(file?.segments).toEqual([
      "curriculum",
      "module-1",
      "run-of-show.md",
    ]);
  });

  it("capitalizes folder display names", () => {
    const tree = getWikiTree();
    const strategy = tree.folders.find((f) => f.name === "strategy");
    expect(strategy?.displayName).toBe("Strategy");
  });
});
