import { getWikiTree } from "@/lib/wiki-tree";
import { WikiSidebar } from "./wiki-sidebar";

interface WikiLayoutProps {
  /** Currently active file path segments, or null for index */
  activePath: string[] | null;
  children: React.ReactNode;
}

export function WikiLayout({ activePath, children }: WikiLayoutProps) {
  const tree = getWikiTree();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <WikiSidebar folders={tree.folders} activePath={activePath} />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
