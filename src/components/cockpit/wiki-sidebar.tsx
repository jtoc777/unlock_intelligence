"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { FileText, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WikiFolder, WikiFile } from "@/lib/wiki-tree";
import { WikiSearch } from "./wiki-search";

const FOLDER_DESCRIPTIONS: Record<string, string> = {
  strategy: "ICP, positioning, pricing, GTM",
  learnings: "Session insights and experiments",
  curriculum: "Module plans, worksheets, run-of-show",
  playbooks: "Reusable processes and checklists",
  artifacts: "Approved messaging and copy",
  ideas: "Feature backlog and brainstorms",
  personas: "Buyer research and profiles",
};

interface WikiSidebarProps {
  folders: WikiFolder[];
  /** Segments of the currently active file, or null if no file selected */
  activePath: string[] | null;
}

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

function filterFolder(folder: WikiFolder, query: string): WikiFolder | null {
  if (!query) return folder;

  const matchedFiles = folder.files.filter((f) =>
    matchesQuery(f.displayName, query),
  );
  const matchedSubfolders = folder.subfolders
    .map((sf) => filterFolder(sf, query))
    .filter((sf): sf is WikiFolder => sf !== null);

  const folderMatches = matchesQuery(folder.displayName, query);

  if (folderMatches || matchedFiles.length > 0 || matchedSubfolders.length > 0) {
    return {
      ...folder,
      files: folderMatches ? folder.files : matchedFiles,
      subfolders: folderMatches ? folder.subfolders : matchedSubfolders,
      fileCount: folderMatches
        ? folder.fileCount
        : matchedFiles.length +
          matchedSubfolders.reduce((sum, sf) => sum + sf.fileCount, 0),
    };
  }
  return null;
}

function segmentsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((seg, i) => seg === b[i]);
}

function isPathUnderFolder(activePath: string[], folderName: string): boolean {
  return activePath.length > 0 && activePath[0] === folderName;
}

function FileLink({
  file,
  isActive,
  depth,
}: {
  file: WikiFile;
  isActive: boolean;
  depth: number;
}) {
  return (
    <Link
      href={`/cockpit/wiki/${file.segments.join("/")}`}
      className={cn(
        "flex items-center gap-2 rounded-md py-1 text-sm transition-colors",
        isActive
          ? "border-l-2 border-l-[#3B82F6] bg-black/[0.03] pl-[calc(theme(spacing[2.5])-2px)] font-medium text-[#1a1a2e]"
          : "border-l-2 border-l-transparent pl-[calc(theme(spacing[2.5])-2px)] text-[#64748B] hover:bg-black/[0.03] hover:text-[#1a1a2e]",
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <FileText className="size-3.5 shrink-0" />
      <span className="truncate">{file.displayName}</span>
    </Link>
  );
}

function SubfolderSection({
  folder,
  activePath,
  depth,
  forceOpen,
}: {
  folder: WikiFolder;
  activePath: string[] | null;
  depth: number;
  forceOpen: boolean;
}) {
  const isOpen =
    forceOpen ||
    (activePath !== null &&
      activePath.length > depth &&
      activePath[depth] === folder.name);

  return (
    <details open={isOpen || undefined} className="group/sub">
      <summary
        className="flex cursor-pointer items-center gap-1.5 rounded-md py-1 text-sm text-[#64748B] transition-colors hover:text-[#1a1a2e] [&::-webkit-details-marker]:hidden"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <ChevronRight className="size-3 shrink-0 transition-transform group-open/sub:rotate-90" />
        <span className="truncate">{folder.displayName}</span>
        <span className="ml-auto pr-1 text-xs text-[#9ca3af]">{folder.fileCount}</span>
      </summary>
      <div>
        {folder.files.map((file) => (
          <FileLink
            key={file.name}
            file={file}
            isActive={activePath !== null && segmentsEqual(activePath, file.segments)}
            depth={depth + 1}
          />
        ))}
        {folder.subfolders.map((sf) => (
          <SubfolderSection
            key={sf.name}
            folder={sf}
            activePath={activePath}
            depth={depth + 1}
            forceOpen={forceOpen}
          />
        ))}
      </div>
    </details>
  );
}

function FolderSection({
  folder,
  activePath,
  forceOpen,
}: {
  folder: WikiFolder;
  activePath: string[] | null;
  forceOpen: boolean;
}) {
  const isActive =
    forceOpen ||
    (activePath !== null && isPathUnderFolder(activePath, folder.name));

  return (
    <details open={isActive || undefined} className="group">
      <summary className="flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-[#1a1a2e] transition-colors hover:bg-black/[0.03] [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-3.5 shrink-0 text-[#9ca3af] transition-transform group-open:rotate-90" />
        <span className="truncate">{folder.displayName}</span>
        <span className="ml-auto text-xs font-normal text-[#9ca3af]">
          {folder.fileCount}
        </span>
      </summary>
      {FOLDER_DESCRIPTIONS[folder.name] && (
        <p className="mb-1 px-2.5 pl-[26px] text-xs text-[#9ca3af]">
          {FOLDER_DESCRIPTIONS[folder.name]}
        </p>
      )}
      <div className="pb-1">
        {folder.files.map((file) => (
          <FileLink
            key={file.name}
            file={file}
            isActive={activePath !== null && segmentsEqual(activePath, file.segments)}
            depth={1}
          />
        ))}
        {folder.subfolders.map((sf) => (
          <SubfolderSection
            key={sf.name}
            folder={sf}
            activePath={activePath}
            depth={1}
            forceOpen={forceOpen}
          />
        ))}
      </div>
    </details>
  );
}

export function WikiSidebar({ folders, activePath }: WikiSidebarProps) {
  const [query, setQuery] = useState("");

  const handleFilter = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const filteredFolders = useMemo(() => {
    if (!query) return folders;
    return folders
      .map((f) => filterFolder(f, query))
      .filter((f): f is WikiFolder => f !== null);
  }, [folders, query]);

  return (
    <aside className="hidden w-[220px] shrink-0 overflow-y-auto border-r border-black/[0.06] bg-white md:block">
      <div className="sticky top-0 z-10 bg-white p-3 pb-2">
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="size-4 text-[#6b7280]" />
          <span className="text-sm font-semibold text-[#1a1a2e]">
            Knowledge base
          </span>
        </div>
        <WikiSearch onFilter={handleFilter} />
      </div>
      <nav className="px-1.5 pb-3" aria-label="Wiki navigation">
        {filteredFolders.length === 0 && (
          <p className="px-2.5 py-4 text-center text-xs text-[#9ca3af]">
            No matching docs
          </p>
        )}
        {filteredFolders.map((folder) => (
          <FolderSection
            key={folder.name}
            folder={folder}
            activePath={activePath}
            forceOpen={query.length > 0}
          />
        ))}
      </nav>
    </aside>
  );
}
