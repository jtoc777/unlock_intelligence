import fs from "fs";
import path from "path";
import Link from "next/link";
import { FileText, Folder, BookOpen } from "lucide-react";
import { WikiLayout } from "@/components/cockpit/wiki-layout";

interface DirEntry {
  name: string;
  isDirectory: boolean;
  path: string;
  fileCount?: number;
}

function getKnowledgeTree(): DirEntry[] {
  const knowledgeDir = path.join(process.cwd(), "knowledge");
  if (!fs.existsSync(knowledgeDir)) return [];

  const entries = fs.readdirSync(knowledgeDir, { withFileTypes: true });
  return entries
    .filter((e) => !e.name.startsWith("_") && !e.name.startsWith("."))
    .map((e) => {
      const entryPath = path.join(knowledgeDir, e.name);
      let fileCount: number | undefined;
      if (e.isDirectory()) {
        fileCount = countMdFiles(entryPath);
      }
      return {
        name: e.name,
        isDirectory: e.isDirectory(),
        path: e.name,
        fileCount,
      };
    })
    .sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
}

function countMdFiles(dir: string): number {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      count += countMdFiles(path.join(dir, e.name));
    } else if (e.name.endsWith(".md") && !e.name.startsWith("_")) {
      count++;
    }
  }
  return count;
}

const FOLDER_DESCRIPTIONS: Record<string, string> = {
  strategy: "ICP, positioning, pricing, GTM plans",
  learnings: "Session insights and experiments",
  curriculum: "Module plans, worksheets, run-of-show",
  playbooks: "Reusable processes and checklists",
  artifacts: "Approved messaging and copy",
  ideas: "Feature backlog and brainstorms",
  personas: "Buyer research and profiles",
};

export default function WikiIndex() {
  const entries = getKnowledgeTree();

  return (
    <WikiLayout activePath={null}>
      {/* Desktop: welcome state */}
      <div className="hidden h-full items-center justify-center md:flex">
        <div className="text-center">
          <BookOpen className="mx-auto mb-3 size-8 text-[#d1d5db]" />
          <p className="text-sm text-[#9ca3af]">
            Select a document from the sidebar
          </p>
        </div>
      </div>

      {/* Mobile: folder card grid */}
      <div className="mx-auto max-w-4xl px-4 py-6 md:hidden">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-[#6b7280]" />
            <h1 className="text-xl font-semibold text-[#1a1a2e]">Knowledge base</h1>
          </div>
          <p className="mt-1 text-sm text-[#6b7280]">
            Strategy docs, learnings, playbooks, and curriculum — updated every deploy.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {entries.map((entry) => (
            <Link key={entry.path} href={`/cockpit/wiki/${entry.path}`}>
              <div className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm transition-colors hover:border-black/[0.1]">
                {entry.isDirectory ? (
                  <Folder className="mt-0.5 size-4 shrink-0 text-amber-500" />
                ) : (
                  <FileText className="mt-0.5 size-4 shrink-0 text-[#9ca3af]" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium capitalize text-[#1a1a2e]">
                    {entry.name.replace(/\.md$/, "").replace(/-/g, " ")}
                  </p>
                  {entry.isDirectory && FOLDER_DESCRIPTIONS[entry.name] && (
                    <p className="mt-0.5 text-xs text-[#6b7280]">
                      {FOLDER_DESCRIPTIONS[entry.name]}
                    </p>
                  )}
                  {entry.fileCount !== undefined && (
                    <p className="mt-0.5 text-xs text-[#9ca3af]">
                      {entry.fileCount} {entry.fileCount === 1 ? "doc" : "docs"}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </WikiLayout>
  );
}
