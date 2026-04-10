import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock framer-motion to render plain divs/spans
vi.mock("framer-motion", () => {
  const React = require("react");
  const actual = {
    motion: new Proxy(
      {},
      {
        get: (_target: unknown, prop: string) => {
          return React.forwardRef((props: Record<string, unknown>, ref: unknown) => {
            const {
              initial: _initial,
              animate: _animate,
              exit: _exit,
              variants: _variants,
              whileInView: _whileInView,
              viewport: _viewport,
              transition: _transition,
              style,
              ...rest
            } = props;
            return React.createElement(prop, { ...rest, style, ref });
          });
        },
      }
    ),
    useScroll: () => ({ scrollY: { get: () => 0, onChange: () => () => {} } }),
    useTransform: () => 0,
    AnimatePresence: ({ children }: { children: unknown }) => children,
  };
  return actual;
});

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    const React = require("react");
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock @base-ui/react/button
vi.mock("@base-ui/react/button", () => {
  const React = require("react");
  const Button = React.forwardRef(
    ({ children, className, render, ...props }: Record<string, unknown>, ref: unknown) => {
      if (render && React.isValidElement(render)) {
        return React.cloneElement(render as React.ReactElement, { className, ref, ...props }, children);
      }
      return React.createElement("button", { className, ref, ...props }, children);
    }
  );
  return { Button };
});

import { CalloutBlock } from "../callout-block";
import { KeyTakeaways } from "../key-takeaways";
import { InsightCard } from "../insight-card";
import { ArticleCta } from "../article-cta";
import { RelatedInsights } from "../related-insights";
import { ArticleLayout } from "../article-layout";

// ─── CalloutBlock ────────────────────────────────
describe("CalloutBlock", () => {
  it("renders the quote text", () => {
    render(<CalloutBlock quote="AI fluency is the new literacy." />);
    expect(screen.getByText("AI fluency is the new literacy.")).toBeInTheDocument();
  });

  it("renders as a blockquote element", () => {
    render(<CalloutBlock quote="Test quote" />);
    const blockquote = screen.getByText("Test quote").closest("blockquote");
    expect(blockquote).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CalloutBlock quote="Styled quote" className="my-custom-class" />);
    const blockquote = screen.getByText("Styled quote").closest("blockquote");
    expect(blockquote).toHaveClass("my-custom-class");
  });
});

// ─── KeyTakeaways ────────────────────────────────
describe("KeyTakeaways", () => {
  const takeaways = [
    "AI adoption requires structured frameworks",
    "Teams need shared vocabulary before tools",
    "Practical reps beat theoretical knowledge",
  ];

  it("renders the Key Takeaways label", () => {
    render(<KeyTakeaways takeaways={takeaways} />);
    expect(screen.getByText("Key Takeaways")).toBeInTheDocument();
  });

  it("renders all takeaway items", () => {
    render(<KeyTakeaways takeaways={takeaways} />);
    takeaways.forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("renders the correct number of list items", () => {
    render(<KeyTakeaways takeaways={takeaways} />);
    const list = screen.getByRole("list");
    expect(list.querySelectorAll("li")).toHaveLength(3);
  });

  it("applies custom className", () => {
    const { container } = render(
      <KeyTakeaways takeaways={takeaways} className="extra-class" />
    );
    expect(container.querySelector(".extra-class")).toBeInTheDocument();
  });
});

// ─── InsightCard ─────────────────────────────────
describe("InsightCard", () => {
  const props = {
    slug: "ai-skills-gap",
    title: "The AI Skills Gap Is Widening",
    subtitle: "Why most enterprises are falling behind on AI adoption.",
    category: "Strategy",
    readingTime: "5 min read",
  };

  it("renders the category label", () => {
    render(<InsightCard {...props} />);
    expect(screen.getByText("Strategy")).toBeInTheDocument();
  });

  it("renders the title as an h3", () => {
    render(<InsightCard {...props} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("The AI Skills Gap Is Widening");
  });

  it("renders the subtitle", () => {
    render(<InsightCard {...props} />);
    expect(
      screen.getByText("Why most enterprises are falling behind on AI adoption.")
    ).toBeInTheDocument();
  });

  it("renders the reading time", () => {
    render(<InsightCard {...props} />);
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("links to the correct slug URL", () => {
    render(<InsightCard {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/insights/ai-skills-gap");
  });

  it("has an accessible aria-label", () => {
    render(<InsightCard {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Read article: The AI Skills Gap Is Widening"
    );
  });
});

// ─── ArticleCta ──────────────────────────────────
describe("ArticleCta", () => {
  const props = {
    heading: "Ready to close the gap?",
    subtext: "Get a custom proposal for your team.",
    buttonText: "Talk to Us",
    buttonHref: "/contact",
    articleTitle: "The AI Skills Gap",
  };

  it("renders the heading", () => {
    render(<ArticleCta {...props} />);
    expect(screen.getByText("Ready to close the gap?")).toBeInTheDocument();
  });

  it("renders the subtext", () => {
    render(<ArticleCta {...props} />);
    expect(
      screen.getByText("Get a custom proposal for your team.")
    ).toBeInTheDocument();
  });

  it("renders the CTA button with correct href", () => {
    render(<ArticleCta {...props} />);
    const button = screen.getByText("Talk to Us");
    expect(button.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders the forward-to-team share button", () => {
    render(<ArticleCta {...props} />);
    const forwardButton = screen.getByText("Forward to your team");
    expect(forwardButton.closest("button")).toBeInTheDocument();
  });

  it("renders forward label when articleTitle is not provided", () => {
    render(
      <ArticleCta
        heading="Test"
        subtext="Sub"
        buttonText="CTA"
        buttonHref="/test"
      />
    );
    expect(screen.getByText("Forward to your team")).toBeInTheDocument();
  });
});

// ─── RelatedInsights ─────────────────────────────
describe("RelatedInsights", () => {
  const articles = [
    {
      slug: "article-one",
      title: "Article One Title",
      subtitle: "First article subtitle.",
      category: "Research",
      readingTime: "4 min read",
    },
    {
      slug: "article-two",
      title: "Article Two Title",
      subtitle: "Second article subtitle.",
      category: "Strategy",
      readingTime: "6 min read",
    },
  ];

  it("renders the Related Insights label", () => {
    render(<RelatedInsights articles={articles} />);
    expect(screen.getByText("Related Insights")).toBeInTheDocument();
  });

  it("renders both article cards", () => {
    render(<RelatedInsights articles={articles} />);
    expect(screen.getByText("Article One Title")).toBeInTheDocument();
    expect(screen.getByText("Article Two Title")).toBeInTheDocument();
  });

  it("renders nothing when articles array is empty", () => {
    const { container } = render(<RelatedInsights articles={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("limits to two articles even when more are passed", () => {
    const threeArticles = [
      ...articles,
      {
        slug: "article-three",
        title: "Article Three Title",
        subtitle: "Third.",
        category: "Ops",
        readingTime: "3 min read",
      },
    ];
    render(<RelatedInsights articles={threeArticles} />);
    expect(screen.getByText("Article One Title")).toBeInTheDocument();
    expect(screen.getByText("Article Two Title")).toBeInTheDocument();
    expect(screen.queryByText("Article Three Title")).not.toBeInTheDocument();
  });
});

// ─── ArticleLayout ───────────────────────────────
describe("ArticleLayout", () => {
  const layoutProps = {
    title: "Why AI Fluency Matters Now",
    subtitle: "The case for investing in structured AI training.",
    category: "Strategy",
    readingTime: "7 min read",
    keyTakeaways: [
      "Structured training beats ad-hoc learning",
      "Shared frameworks accelerate adoption",
    ],
    cta: {
      heading: "Ready to close the gap?",
      subtext: "Get your team started.",
      buttonText: "Talk to Us",
      buttonHref: "/contact",
    },
    relatedArticles: [
      {
        slug: "related-one",
        title: "Related Article One",
        subtitle: "First related.",
        category: "Research",
        readingTime: "4 min read",
      },
      {
        slug: "related-two",
        title: "Related Article Two",
        subtitle: "Second related.",
        category: "Ops",
        readingTime: "5 min read",
      },
    ],
  };

  it("renders the breadcrumb with link to /insights", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body content</p>
      </ArticleLayout>
    );
    const breadcrumbNav = screen.getByLabelText("Breadcrumb");
    expect(breadcrumbNav).toBeInTheDocument();
    const insightsLink = screen.getByText("Insights");
    expect(insightsLink.closest("a")).toHaveAttribute("href", "/insights");
  });

  it("renders the article title in breadcrumb", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    // The title appears in breadcrumb and as h1 — check breadcrumb nav
    const breadcrumbNav = screen.getByLabelText("Breadcrumb");
    expect(breadcrumbNav).toHaveTextContent("Why AI Fluency Matters Now");
  });

  it("renders the category and reading time", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("7 min read")).toBeInTheDocument();
  });

  it("renders the h1 title", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Why AI Fluency Matters Now");
  });

  it("renders the subtitle", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    expect(
      screen.getByText("The case for investing in structured AI training.")
    ).toBeInTheDocument();
  });

  it("renders key takeaways", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    expect(screen.getByText("Key Takeaways")).toBeInTheDocument();
    expect(
      screen.getByText("Structured training beats ad-hoc learning")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Shared frameworks accelerate adoption")
    ).toBeInTheDocument();
  });

  it("renders children as article body", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>This is the article body content.</p>
      </ArticleLayout>
    );
    expect(
      screen.getByText("This is the article body content.")
    ).toBeInTheDocument();
  });

  it("renders forward-to-team share buttons", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    const forwardButtons = screen.getAllByText(/Forward.*team/);
    expect(forwardButtons.length).toBeGreaterThan(0);
    expect(forwardButtons[0].closest("button")).toBeInTheDocument();
  });

  it("renders the CTA block", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    expect(screen.getByText("Ready to close the gap?")).toBeInTheDocument();
    expect(screen.getByText("Talk to Us")).toBeInTheDocument();
  });

  it("renders related insights", () => {
    render(
      <ArticleLayout {...layoutProps}>
        <p>Body</p>
      </ArticleLayout>
    );
    expect(screen.getByText("Related Insights")).toBeInTheDocument();
    expect(screen.getByText("Related Article One")).toBeInTheDocument();
    expect(screen.getByText("Related Article Two")).toBeInTheDocument();
  });
});
