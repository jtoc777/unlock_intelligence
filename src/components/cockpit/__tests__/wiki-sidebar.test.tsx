import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { WikiFolder } from "@/lib/wiki-tree";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    const React = require("react");
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Import after mocks
import { WikiSidebar } from "../wiki-sidebar";

const MOCK_FOLDERS: WikiFolder[] = [
  {
    name: "strategy",
    displayName: "Strategy",
    fileCount: 3,
    files: [
      {
        name: "icp-and-buyer-personas.md",
        displayName: "Icp and buyer personas",
        segments: ["strategy", "icp-and-buyer-personas.md"],
      },
      {
        name: "pricing-strategy.md",
        displayName: "Pricing strategy",
        segments: ["strategy", "pricing-strategy.md"],
      },
      {
        name: "competitive-positioning.md",
        displayName: "Competitive positioning",
        segments: ["strategy", "competitive-positioning.md"],
      },
    ],
    subfolders: [],
  },
  {
    name: "learnings",
    displayName: "Learnings",
    fileCount: 2,
    files: [
      {
        name: "2026-04-02-design-review.md",
        displayName: "Design review",
        segments: ["learnings", "2026-04-02-design-review.md"],
      },
      {
        name: "competitive-landscape.md",
        displayName: "Competitive landscape",
        segments: ["learnings", "competitive-landscape.md"],
      },
    ],
    subfolders: [],
  },
  {
    name: "curriculum",
    displayName: "Curriculum",
    fileCount: 1,
    files: [],
    subfolders: [
      {
        name: "module-1",
        displayName: "Module 1",
        fileCount: 1,
        files: [
          {
            name: "run-of-show.md",
            displayName: "Run of show",
            segments: ["curriculum", "module-1", "run-of-show.md"],
          },
        ],
        subfolders: [],
      },
    ],
  },
];

describe("WikiSidebar", () => {
  it("renders the knowledge base header", () => {
    render(<WikiSidebar folders={MOCK_FOLDERS} activePath={null} />);
    expect(screen.getByText("Knowledge base")).toBeInTheDocument();
  });

  it("renders folder names and file counts", () => {
    render(<WikiSidebar folders={MOCK_FOLDERS} activePath={null} />);
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("Learnings")).toBeInTheDocument();
    expect(screen.getByText("Curriculum")).toBeInTheDocument();
    // File counts
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders folder description for known folders", () => {
    render(<WikiSidebar folders={MOCK_FOLDERS} activePath={null} />);
    expect(screen.getByText("ICP, positioning, pricing, GTM")).toBeInTheDocument();
    expect(
      screen.getByText("Session insights and experiments"),
    ).toBeInTheDocument();
  });

  it("renders file links with correct hrefs", () => {
    render(
      <WikiSidebar
        folders={MOCK_FOLDERS}
        activePath={["strategy", "pricing-strategy.md"]}
      />,
    );
    const link = screen.getByText("Pricing strategy").closest("a");
    expect(link).toHaveAttribute(
      "href",
      "/cockpit/wiki/strategy/pricing-strategy.md",
    );
  });

  it("highlights the active file", () => {
    render(
      <WikiSidebar
        folders={MOCK_FOLDERS}
        activePath={["strategy", "pricing-strategy.md"]}
      />,
    );
    const activeLink = screen.getByText("Pricing strategy").closest("a");
    expect(activeLink?.className).toContain("border-l-[#3B82F6]");
    expect(activeLink?.className).toContain("font-medium");
  });

  it("does not highlight inactive files", () => {
    render(
      <WikiSidebar
        folders={MOCK_FOLDERS}
        activePath={["strategy", "pricing-strategy.md"]}
      />,
    );
    const inactiveLink = screen.getByText("Competitive positioning").closest("a");
    expect(inactiveLink?.className).toContain("border-l-transparent");
  });

  it("renders the search input", () => {
    render(<WikiSidebar folders={MOCK_FOLDERS} activePath={null} />);
    expect(screen.getByPlaceholderText("Search docs...")).toBeInTheDocument();
  });

  it("filters folders and files by search query", () => {
    render(<WikiSidebar folders={MOCK_FOLDERS} activePath={null} />);
    const input = screen.getByPlaceholderText("Search docs...");
    fireEvent.change(input, { target: { value: "pricing" } });

    // "Pricing strategy" should be visible
    expect(screen.getByText("Pricing strategy")).toBeInTheDocument();
    // "Design review" should not be visible
    expect(screen.queryByText("Design review")).not.toBeInTheDocument();
  });

  it("shows no matching docs message when query matches nothing", () => {
    render(<WikiSidebar folders={MOCK_FOLDERS} activePath={null} />);
    const input = screen.getByPlaceholderText("Search docs...");
    fireEvent.change(input, { target: { value: "zzzznonexistent" } });
    expect(screen.getByText("No matching docs")).toBeInTheDocument();
  });

  it("renders subfolder sections with nested files", () => {
    render(
      <WikiSidebar
        folders={MOCK_FOLDERS}
        activePath={["curriculum", "module-1", "run-of-show.md"]}
      />,
    );
    expect(screen.getByText("Module 1")).toBeInTheDocument();
    expect(screen.getByText("Run of show")).toBeInTheDocument();
  });

  it("has the hidden class for mobile", () => {
    const { container } = render(
      <WikiSidebar folders={MOCK_FOLDERS} activePath={null} />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.className).toContain("hidden");
    expect(aside?.className).toContain("md:block");
  });
});
