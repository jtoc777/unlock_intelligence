import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, Folder, ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/cockpit/markdown-content";
import { markdownToHtml } from "@/lib/markdown";
import { WikiLayout } from "@/components/cockpit/wiki-layout";

interface WikiPageProps {
  params: Promise<{ path: string[] }>;
}

function resolveKnowledgePath(segments: string[]): string {
  return path.join(process.cwd(), "knowledge", ...segments);
}

function getDirectoryEntries(dirPath: string) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return null;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries
    .filter((e) => !e.name.startsWith("_") && !e.name.startsWith("."))
    .map((e) => ({
      name: e.name,
      isDirectory: e.isDirectory(),
    }))
    .sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
}

function getFileContent(filePath: string): string | null {
  // Try exact path, then with .md extension
  for (const p of [filePath, filePath + ".md"]) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      return fs.readFileSync(p, "utf-8");
    }
  }
  return null;
}

function formatName(name: string): string {
  return name
    .replace(/\.md$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "") // strip date prefix
    .replace(/-/g, " ");
}

function Breadcrumbs({ segments }: { segments: string[] }) {
  return (
    <nav className="mb-4 flex items-center gap-1 text-sm text-[#6b7280]">
      <Link href="/cockpit/wiki" className="transition-colors hover:text-[#1a1a2e]">
        Knowledge
      </Link>
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="size-3" />
          {i < segments.length - 1 ? (
            <Link
              href={`/cockpit/wiki/${segments.slice(0, i + 1).join("/")}`}
              className="transition-colors hover:text-[#1a1a2e]"
            >
              {formatName(seg)}
            </Link>
          ) : (
            <span className="text-[#1a1a2e]">{formatName(seg)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { path: segments } = await params;
  const fullPath = resolveKnowledgePath(segments);

  // ── Directory view ──────────────────────────────────────────────────
  const dirEntries = getDirectoryEntries(fullPath);
  if (dirEntries !== null) {
    const parentPath =
      segments.length > 1
        ? `/cockpit/wiki/${segments.slice(0, -1).join("/")}`
        : "/cockpit/wiki";

    const readmeEntry = dirEntries.find(
      (e) => e.name.toLowerCase() === "readme.md",
    );
    let readmeHtml: string | null = null;
    if (readmeEntry) {
      readmeHtml = await markdownToHtml(
        fs.readFileSync(path.join(fullPath, "README.md"), "utf-8"),
      );
    }

    const directoryContent = (
      <>
        <Breadcrumbs segments={segments} />

        <div className="mb-6 flex items-center gap-3">
          <Link
            href={parentPath}
            className="text-[#9ca3af] transition-colors hover:text-[#1a1a2e]"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-xl font-semibold text-[#1a1a2e]">
            {formatName(segments[segments.length - 1])}
          </h1>
        </div>

        {readmeHtml && (
          <div className="mb-6 rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm md:p-6">
            <MarkdownContent html={readmeHtml} />
          </div>
        )}

        <div className="space-y-1">
          {dirEntries
            .filter((e) => e.name.toLowerCase() !== "readme.md")
            .map((entry) => (
              <Link
                key={entry.name}
                href={`/cockpit/wiki/${[...segments, entry.name].join("/")}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-black/[0.03]"
              >
                {entry.isDirectory ? (
                  <Folder className="size-4 shrink-0 text-amber-500" />
                ) : (
                  <FileText className="size-4 shrink-0 text-[#9ca3af]" />
                )}
                <span className="text-sm text-[#6b7280]">
                  {formatName(entry.name)}
                </span>
              </Link>
            ))}
        </div>
      </>
    );

    return (
      <WikiLayout activePath={segments}>
        {/* Mobile: full-width directory listing */}
        <div className="mx-auto max-w-4xl px-4 py-6 md:hidden">
          {directoryContent}
        </div>
        {/* Desktop: directory listing inside content pane */}
        <div className="hidden p-6 md:block">
          <div className="mx-auto max-w-3xl">
            {directoryContent}
          </div>
        </div>
      </WikiLayout>
    );
  }

  // ── File view ───────────────────────────────────────────────────────
  const rawContent = getFileContent(fullPath);
  if (rawContent === null) notFound();
  const html = await markdownToHtml(rawContent);

  const parentPath =
    segments.length > 1
      ? `/cockpit/wiki/${segments.slice(0, -1).join("/")}`
      : "/cockpit/wiki";

  const fileContent = (
    <>
      <Breadcrumbs segments={segments} />

      <div className="mb-6 flex items-center gap-3">
        <Link
          href={parentPath}
          className="text-[#9ca3af] transition-colors hover:text-[#1a1a2e]"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-xl font-semibold text-[#1a1a2e]">
          {formatName(segments[segments.length - 1])}
        </h1>
      </div>
    </>
  );

  return (
    <WikiLayout activePath={segments}>
      {/* Mobile: full-width */}
      <div className="mx-auto max-w-4xl px-4 py-6 md:hidden">
        {fileContent}
        <div className="rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm md:p-8">
          <MarkdownContent html={html} />
        </div>
      </div>
      {/* Desktop: content in white card on gray bg */}
      <div className="hidden bg-[#f8f8fa] p-6 md:block">
        <div className="mx-auto max-w-3xl">
          {fileContent}
          <div className="rounded-xl border border-black/[0.06] bg-white p-6 shadow-sm md:p-8">
            <MarkdownContent html={html} />
          </div>
        </div>
      </div>
    </WikiLayout>
  );
}
