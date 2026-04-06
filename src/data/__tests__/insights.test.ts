/**
 * What: Unit tests for insights article data integrity.
 * Why: Prevents broken slugs, links, and voice rules in content.
 * How: Vitest asserts on exported arrays and helper functions.
 * Deps: vitest, ../insights module under test.
 */
import { describe, it, expect } from "vitest";
import {
  insights,
  getInsightBySlug,
  getRelatedInsights,
} from "../insights";
import type { InsightArticle } from "../insights";

// ─── Data integrity ─────────────────────────────────────────────────────────

describe("insights data", () => {
  it("exports exactly 5 articles", () => {
    expect(insights).toHaveLength(5);
  });

  it("has unique slugs across all articles", () => {
    const slugs = insights.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every article has a non-empty title", () => {
    for (const article of insights) {
      expect(article.title.length).toBeGreaterThan(0);
    }
  });

  it("every article has a non-empty subtitle", () => {
    for (const article of insights) {
      expect(article.subtitle.length).toBeGreaterThan(0);
    }
  });

  it("every article has a valid readingTime format", () => {
    for (const article of insights) {
      expect(article.readingTime).toMatch(/^\d+ min read$/);
    }
  });

  it("every article has a non-empty category", () => {
    for (const article of insights) {
      expect(article.category.length).toBeGreaterThan(0);
    }
  });

  it("every article has at least 3 key takeaways", () => {
    for (const article of insights) {
      expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every article has at least 3 sections", () => {
    for (const article of insights) {
      expect(article.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every section has a heading and at least one paragraph", () => {
    for (const article of insights) {
      for (const section of article.sections) {
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.paragraphs.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("every article has a CTA with text and href", () => {
    for (const article of insights) {
      expect(article.cta.text.length).toBeGreaterThan(0);
      expect(article.cta.href).toMatch(/^\//);
    }
  });

  it("every article has relatedSlugs that reference existing articles", () => {
    const allSlugs = new Set(insights.map((a) => a.slug));
    for (const article of insights) {
      for (const related of article.relatedSlugs) {
        expect(allSlugs.has(related)).toBe(true);
      }
    }
  });

  it("no article references itself in relatedSlugs", () => {
    for (const article of insights) {
      expect(article.relatedSlugs).not.toContain(article.slug);
    }
  });
});

// ─── Voice & content rules ──────────────────────────────────────────────────

describe("insights voice rules", () => {
  const allParagraphs = insights.flatMap((a) =>
    a.sections.flatMap((s) => s.paragraphs)
  );

  it("no paragraph contains filler phrases", () => {
    const fillerPhrases = [
      "In today's rapidly evolving",
      "It's no secret that",
      "Let's dive in",
      "As we all know",
    ];
    for (const paragraph of allParagraphs) {
      for (const filler of fillerPhrases) {
        expect(paragraph).not.toContain(filler);
      }
    }
  });

  it("no paragraph contains exclamation marks", () => {
    for (const paragraph of allParagraphs) {
      expect(paragraph).not.toContain("!");
    }
  });

  it("brand name appears only in CTA text, not in article body paragraphs", () => {
    for (const article of insights) {
      for (const section of article.sections) {
        for (const paragraph of section.paragraphs) {
          expect(paragraph).not.toContain("Unlock Intelligence");
        }
      }
    }
  });

  it("brand name appears in CTA text", () => {
    const ctasWithBrand = insights.filter((a) =>
      a.cta.text.includes("Unlock Intelligence")
    );
    expect(ctasWithBrand.length).toBeGreaterThanOrEqual(1);
  });

  it("no paragraph contains emoji", () => {
    // Broad emoji regex covering common ranges
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2702}-\u{27B0}\u{FE0F}]/u;
    for (const paragraph of allParagraphs) {
      expect(paragraph).not.toMatch(emojiRegex);
    }
  });
});

// ─── Specific article slugs ─────────────────────────────────────────────────

describe("expected article slugs", () => {
  const expectedSlugs = [
    "ai-training-budget-line-item",
    "stop-teaching-prompting",
    "ai-adoption-dies-three-weeks",
    "same-mistake-everyone-makes",
    "what-do-you-hate",
  ];

  it.each(expectedSlugs)("contains article with slug \"%s\"", (slug) => {
    const article = insights.find((a) => a.slug === slug);
    expect(article).toBeDefined();
  });
});

// ─── Callouts ───────────────────────────────────────────────────────────────

describe("callouts", () => {
  it("at least 3 articles have a section with a callout", () => {
    const articlesWithCallout = insights.filter((a) =>
      a.sections.some((s) => s.callout && s.callout.length > 0)
    );
    expect(articlesWithCallout.length).toBeGreaterThanOrEqual(3);
  });

  it("callouts are non-empty strings when present", () => {
    for (const article of insights) {
      for (const section of article.sections) {
        if (section.callout !== undefined) {
          expect(typeof section.callout).toBe("string");
          expect(section.callout.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

// ─── getInsightBySlug ───────────────────────────────────────────────────────

describe("getInsightBySlug", () => {
  it("returns the correct article for a known slug", () => {
    const article = getInsightBySlug("stop-teaching-prompting");
    expect(article).toBeDefined();
    expect(article?.title).toBe(
      "Stop Teaching People to Prompt. Teach Them to Build."
    );
  });

  it("returns undefined for an unknown slug", () => {
    const result = getInsightBySlug("nonexistent-slug");
    expect(result).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    const result = getInsightBySlug("");
    expect(result).toBeUndefined();
  });

  it("returns an object satisfying InsightArticle shape", () => {
    const article = getInsightBySlug(
      "ai-training-budget-line-item"
    ) as InsightArticle;
    expect(article).toHaveProperty("slug");
    expect(article).toHaveProperty("title");
    expect(article).toHaveProperty("subtitle");
    expect(article).toHaveProperty("readingTime");
    expect(article).toHaveProperty("category");
    expect(article).toHaveProperty("keyTakeaways");
    expect(article).toHaveProperty("sections");
    expect(article).toHaveProperty("cta");
    expect(article).toHaveProperty("relatedSlugs");
  });
});

// ─── getRelatedInsights ─────────────────────────────────────────────────────

describe("getRelatedInsights", () => {
  it("returns articles matching the provided slugs", () => {
    const related = getRelatedInsights([
      "stop-teaching-prompting",
      "what-do-you-hate",
    ]);
    expect(related).toHaveLength(2);
    expect(related[0].slug).toBe("stop-teaching-prompting");
    expect(related[1].slug).toBe("what-do-you-hate");
  });

  it("returns an empty array for no matching slugs", () => {
    const related = getRelatedInsights(["nonexistent-a", "nonexistent-b"]);
    expect(related).toHaveLength(0);
  });

  it("returns an empty array for an empty input", () => {
    const related = getRelatedInsights([]);
    expect(related).toHaveLength(0);
  });

  it("filters out non-matching slugs and returns only matches", () => {
    const related = getRelatedInsights([
      "stop-teaching-prompting",
      "nonexistent",
    ]);
    expect(related).toHaveLength(1);
    expect(related[0].slug).toBe("stop-teaching-prompting");
  });

  it("preserves the order of the input slugs", () => {
    const related = getRelatedInsights([
      "what-do-you-hate",
      "ai-training-budget-line-item",
    ]);
    expect(related[0].slug).toBe("what-do-you-hate");
    expect(related[1].slug).toBe("ai-training-budget-line-item");
  });
});
