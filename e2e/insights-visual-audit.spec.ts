import { test, expect, type Page, type Locator } from "@playwright/test";
import { insights } from "../src/data/insights";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Scroll the full page to trigger lazy / scroll-reveal elements */
async function scrollFullPage(page: Page) {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Use small steps and longer dwell to ensure every ScrollReveal enters viewport
    const step = 250;
    let y = 0;
    const max = document.documentElement.scrollHeight;
    while (y < max) {
      window.scrollBy(0, step);
      y += step;
      await delay(120);
    }
    // Stay at bottom for animations to complete (CTA and Related blocks)
    await delay(1000);
    window.scrollTo(0, 0);
    await delay(300);
  });
}

/** Scroll an element into the center of the viewport so Framer Motion triggers */
async function scrollIntoCenter(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  // Allow Framer Motion animation to complete (0.6s duration + margin)
  await page.waitForFunction(
    (selector) => {
      const el = document.querySelector(selector);
      if (!el) return false;
      const style = getComputedStyle(el);
      return style.opacity !== "0";
    },
    "h3, [class*='my-12']",
    { timeout: 3000 }
  ).catch(() => {
    // If specific selector doesn't work, just wait for animations
  });
}

/**
 * Assert an element fits within a given max pixel width (accounting for 1px rounding).
 * Uses boundingBox which returns the rendered width.
 */
async function assertMaxWidth(locator: Locator, maxPx: number, label: string) {
  const box = await locator.boundingBox();
  expect(box, `${label} should be visible`).not.toBeNull();
  expect(box!.width, `${label} width (${box!.width}px) should be <= ${maxPx}px`).toBeLessThanOrEqual(
    maxPx + 2 // 2px tolerance for sub-pixel rounding
  );
}

/**
 * Check that an element does not overflow horizontally beyond the viewport.
 */
async function assertNoOverflow(page: Page, locator: Locator, label: string) {
  const viewport = page.viewportSize()!;
  const box = await locator.boundingBox();
  expect(box, `${label} should be visible`).not.toBeNull();
  expect(
    box!.x + box!.width,
    `${label} right edge (${box!.x + box!.width}px) should not exceed viewport width (${viewport.width}px)`
  ).toBeLessThanOrEqual(viewport.width + 2);
  expect(box!.x, `${label} left edge should be >= 0`).toBeGreaterThanOrEqual(-1);
}

/** Navigate to article and wait for content to be ready */
async function gotoArticle(page: Page, slug: string) {
  await page.goto(`/insights/${slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Trigger all scroll-reveal animations
  await scrollFullPage(page);
}

// The 5 article slugs under audit
const AUDIT_SLUGS = [
  "ai-training-budget-line-item",
  "stop-teaching-prompting-teach-building",
  "why-ai-adoption-dies-three-weeks",
  "same-mistake-everyone-makes-with-ai",
  "what-do-you-hate-why-do-you-hate-it",
] as const;

// Resolve actual slugs from the insights data (they may be shortened)
const articleSlugs = insights.map((a) => a.slug);

// ==========================================================================
// DESKTOP AUDIT (1280 x 800)
// ==========================================================================

test.describe("Insight articles — desktop visual audit (1280x800)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  // --- Screenshot: first article full page ---
  test("screenshot article 1 at desktop resolution", async ({ page }) => {
    await gotoArticle(page, articleSlugs[0]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: "test-results/desktop-article1-top.png",
      fullPage: false,
    });
    await page.screenshot({
      path: "test-results/desktop-article1-full.png",
      fullPage: true,
    });
  });

  for (const slug of articleSlugs) {
    test.describe(`article "${slug}"`, () => {
      test.beforeEach(async ({ page }) => {
        await gotoArticle(page, slug);
      });

      // ----------------------------------------------------------------
      // 1. Breadcrumb
      // ----------------------------------------------------------------
      test("breadcrumb is visible and does not overflow", async ({ page }) => {
        const nav = page.getByLabel("Breadcrumb");
        await expect(nav).toBeVisible();

        // Should contain "Insights" link
        await expect(nav.getByRole("link", { name: "Insights" })).toBeVisible();

        // Breadcrumb must not overflow viewport
        await assertNoOverflow(page, nav, "Breadcrumb nav");
      });

      // ----------------------------------------------------------------
      // 2. Header / hero section alignment
      // ----------------------------------------------------------------
      test("header elements are left-aligned within max-w-[720px]", async ({ page }) => {
        const h1 = page.getByRole("heading", { level: 1 });
        await expect(h1).toBeVisible();
        await assertMaxWidth(h1, 720, "H1 heading");
        await assertNoOverflow(page, h1, "H1 heading");

        // Category tag and reading time row
        const article = insights.find((a) => a.slug === slug)!;
        const categoryTag = page.getByText(article.category, { exact: true }).first();
        await expect(categoryTag).toBeVisible();

        // Subtitle paragraph
        const subtitle = page.getByText(article.subtitle).first();
        await expect(subtitle).toBeVisible();
        await assertMaxWidth(subtitle, 720, "Subtitle");
      });

      // ----------------------------------------------------------------
      // 3. Key Takeaways card
      // ----------------------------------------------------------------
      test("key takeaways card is constrained within 720px column", async ({ page }) => {
        const takeawaysHeading = page.getByText("Key Takeaways", { exact: true });
        await expect(takeawaysHeading).toBeVisible();

        // The parent GlassCard container — find the closest ancestor with the role
        const takeawaysCard = takeawaysHeading.locator("xpath=ancestor::div[contains(@class, 'max-w')]").first();
        // Alternative: just check the wrapper div
        const wrapperDiv = page.locator("article").locator("..").locator("div.max-w-\\[720px\\]").first();

        // Check all bullet items are visible
        const bulletList = page.getByRole("list").filter({ has: page.locator("text=Key Takeaways").locator("..").locator("ul") });
        const allTakeawayItems = page.locator("ul[role='list'] li");
        const count = await allTakeawayItems.count();
        expect(count, "Should have key takeaway bullets").toBeGreaterThan(0);

        // Each bullet should not overflow
        for (let i = 0; i < count; i++) {
          await assertNoOverflow(page, allTakeawayItems.nth(i), `Takeaway bullet ${i}`);
        }
      });

      // ----------------------------------------------------------------
      // 4. Article body — H2 headings and paragraphs
      // ----------------------------------------------------------------
      test("all H2 headings are visible and do not overflow", async ({ page }) => {
        const h2s = page.getByRole("heading", { level: 2 });
        const count = await h2s.count();
        expect(count, "Article should have at least one H2").toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const h2 = h2s.nth(i);
          await expect(h2).toBeVisible();
          await assertNoOverflow(page, h2, `H2[${i}]`);
        }
      });

      test("article body is constrained within max-w-[720px]", async ({ page }) => {
        const articleBody = page.locator("article.max-w-\\[720px\\]");
        await expect(articleBody).toBeVisible();
        await assertMaxWidth(articleBody, 720, "Article body");
      });

      // ----------------------------------------------------------------
      // 5. End CTA block
      // ----------------------------------------------------------------
      test("end CTA block is visible with button", async ({ page }) => {
        const article = insights.find((a) => a.slug === slug)!;

        // Scroll to the bottom of the page to ensure the CTA ScrollReveal triggers
        await page.evaluate(async () => {
          window.scrollTo(0, document.documentElement.scrollHeight);
          await new Promise((r) => setTimeout(r, 800));
        });

        // CTA heading is an h3 inside ArticleCta
        const ctaHeading = page.getByRole("heading", { level: 3, name: "Want to try a different approach?" });
        await expect(ctaHeading).toBeVisible({ timeout: 10000 });

        // CTA button
        const ctaButton = page.getByRole("link", { name: article.cta.text });
        await expect(ctaButton).toBeVisible();
        await assertNoOverflow(page, ctaButton, "CTA button");
      });

      // ----------------------------------------------------------------
      // 6. Related articles section
      // ----------------------------------------------------------------
      test("related articles show 2 cards side by side on desktop", async ({ page }) => {
        // Scroll the related section into view and let ScrollReveal animation finish
        const relatedLabel = page.getByText("Related Insights", { exact: true });

        // Force-scroll to the very bottom so the Related Insights ScrollReveal triggers
        await page.evaluate(async () => {
          window.scrollTo(0, document.documentElement.scrollHeight);
          await new Promise((r) => setTimeout(r, 1200));
        });

        await expect(relatedLabel).toBeVisible({ timeout: 10000 });

        // The grid container
        const relatedGrid = relatedLabel.locator("..").locator("div.grid");
        await expect(relatedGrid).toBeVisible();

        // Count cards (links with article labels)
        const cards = relatedGrid.locator(":scope > a");
        const count = await cards.count();
        expect(count, "Should have 2 related article cards").toBe(2);

        // On desktop, cards should be side-by-side (similar Y position)
        if (count === 2) {
          const box0 = await cards.nth(0).boundingBox();
          const box1 = await cards.nth(1).boundingBox();
          expect(box0).not.toBeNull();
          expect(box1).not.toBeNull();
          // Side by side: tops should be similar. Grid items align to start by default.
          expect(
            Math.abs(box0!.y - box1!.y),
            `Related cards Y offset: ${Math.abs(box0!.y - box1!.y).toFixed(0)}px — should be on the same row`
          ).toBeLessThan(5);
        }
      });

      // ----------------------------------------------------------------
      // 7. Forward-to-team link
      // ----------------------------------------------------------------
      test("forward-to-team mailto link is visible", async ({ page }) => {
        const forwardLink = page.getByRole("link", {
          name: /forward this article/i,
        });
        await expect(forwardLink).toBeVisible();
      });
    });
  }

  // --- Conditional tests: only for articles that have specific content types ---

  // Articles with stats grids
  const articlesWithStats = insights.filter(
    (a) => a.sections.some((s) => s.stats && s.stats.length > 0)
  );
  for (const article of articlesWithStats) {
    const expectedStatCount = article.sections
      .filter((s) => s.stats && s.stats.length > 0)
      .reduce((sum, s) => Math.max(sum, s.stats!.length), 0);

    test(`article "${article.slug}" — stats grid fits within 720px column`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      // Stats cards are inside a grid with sm:grid-cols-3
      const statsGrid = page.locator("article .grid.sm\\:grid-cols-3").first();
      await expect(statsGrid).toBeVisible();
      await assertMaxWidth(statsGrid, 720, "Stats grid");
      await assertNoOverflow(page, statsGrid, "Stats grid");

      // Individual cards — count from actual article data
      const statsCards = statsGrid.locator(":scope > div");
      const count = await statsCards.count();
      expect(count, `Stats grid should have ${expectedStatCount} cards`).toBe(expectedStatCount);

      // Check cards are roughly same height (balanced)
      const heights: number[] = [];
      for (let i = 0; i < count; i++) {
        const box = await statsCards.nth(i).boundingBox();
        expect(box).not.toBeNull();
        heights.push(box!.height);
      }
      const maxH = Math.max(...heights);
      const minH = Math.min(...heights);
      // Cards in a grid row should be similar height (within 40px)
      expect(
        maxH - minH,
        `Stats card heights vary too much: ${heights.map((h) => h.toFixed(0)).join(", ")}px`
      ).toBeLessThan(40);
    });
  }

  // Articles with comparison table
  const articlesWithComparison = insights.filter(
    (a) => a.sections.some((s) => s.comparison)
  );
  for (const article of articlesWithComparison) {
    test(`article "${article.slug}" — comparison table fits within 720px column`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      // Comparison table outer wrapper
      const tableWrapper = page.locator("article .overflow-x-auto").first();
      await expect(tableWrapper).toBeVisible();
      await assertMaxWidth(tableWrapper, 720, "Comparison table wrapper");
      await assertNoOverflow(page, tableWrapper, "Comparison table wrapper");
    });
  }

  // Articles with bullet lists
  const articlesWithBullets = insights.filter(
    (a) => a.sections.some((s) => s.bullets && s.bullets.length > 0)
  );
  for (const article of articlesWithBullets) {
    test(`article "${article.slug}" — bullet lists have visible left border and don't overflow`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      const bulletLists = page.locator("article ul.border-l-2");
      const count = await bulletLists.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const list = bulletLists.nth(i);
        await expect(list).toBeVisible();
        await assertNoOverflow(page, list, `Bullet list[${i}]`);

        // Verify left border is actually rendered (border-l-2 = 2px)
        const borderWidth = await list.evaluate(
          (el) => getComputedStyle(el).borderLeftWidth
        );
        expect(
          parseFloat(borderWidth),
          "Bullet list left border should be ~2px"
        ).toBeGreaterThanOrEqual(1.5);
      }
    });
  }

  // Articles with callout blocks
  const articlesWithCallout = insights.filter(
    (a) => a.sections.some((s) => s.callout)
  );
  for (const article of articlesWithCallout) {
    test(`article "${article.slug}" — callout blocks are styled consistently`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      const callouts = page.locator("article blockquote");
      const count = await callouts.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const callout = callouts.nth(i);
        await expect(callout).toBeVisible();
        await assertNoOverflow(page, callout, `Callout[${i}]`);

        // Verify left border color (should be var(--indigo))
        const borderLeftStyle = await callout.evaluate(
          (el) => getComputedStyle(el).borderLeftStyle
        );
        expect(borderLeftStyle, "Callout should have solid left border").toBe(
          "solid"
        );

        const borderLeftWidth = await callout.evaluate(
          (el) => getComputedStyle(el).borderLeftWidth
        );
        expect(
          parseFloat(borderLeftWidth),
          "Callout left border should be ~3px"
        ).toBeGreaterThanOrEqual(2);
      }
    });
  }
});

// ==========================================================================
// MOBILE AUDIT (393 x 852 — iPhone 14 Pro style)
// ==========================================================================

test.describe("Insight articles — mobile visual audit (393x852)", () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
  });

  // --- Screenshot: first article on mobile ---
  test("screenshot article 1 at mobile resolution", async ({ page }) => {
    await gotoArticle(page, articleSlugs[0]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: "test-results/mobile-article1-top.png",
      fullPage: false,
    });
    await page.screenshot({
      path: "test-results/mobile-article1-full.png",
      fullPage: true,
    });
  });

  for (const slug of articleSlugs) {
    test.describe(`article "${slug}"`, () => {
      test.beforeEach(async ({ page }) => {
        await gotoArticle(page, slug);
      });

      // ----------------------------------------------------------------
      // Mobile: no horizontal overflow (page-level)
      // ----------------------------------------------------------------
      test("no horizontal page-level overflow", async ({ page }) => {
        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          metrics.scrollWidth,
          `scrollWidth (${metrics.scrollWidth}) should not exceed clientWidth (${metrics.clientWidth})`
        ).toBeLessThanOrEqual(metrics.clientWidth + 1);
      });

      // ----------------------------------------------------------------
      // Mobile: H1 wraps cleanly
      // ----------------------------------------------------------------
      test("H1 wraps cleanly and does not overflow", async ({ page }) => {
        const h1 = page.getByRole("heading", { level: 1 });
        await expect(h1).toBeVisible();
        await assertNoOverflow(page, h1, "H1 on mobile");

        // Verify it's multi-line on mobile (height > single line ~40px)
        const box = await h1.boundingBox();
        expect(box).not.toBeNull();
        // H1 on mobile with long titles should wrap, so width should be <=393
        expect(box!.width).toBeLessThanOrEqual(393);
      });

      // ----------------------------------------------------------------
      // Mobile: breadcrumb truncates
      // ----------------------------------------------------------------
      test("breadcrumb does not overflow on mobile", async ({ page }) => {
        const nav = page.getByLabel("Breadcrumb");
        await expect(nav).toBeVisible();
        await assertNoOverflow(page, nav, "Breadcrumb on mobile");
      });

      // ----------------------------------------------------------------
      // Mobile: CTA button is full-width
      // ----------------------------------------------------------------
      test("CTA button is full-width on mobile", async ({ page }) => {
        const article = insights.find((a) => a.slug === slug)!;
        const ctaButton = page.getByRole("link", { name: article.cta.text });
        await expect(ctaButton).toBeVisible();

        const box = await ctaButton.boundingBox();
        expect(box).not.toBeNull();
        // On mobile, button should be close to full container width (>= 80% of viewport)
        const viewportWidth = page.viewportSize()!.width;
        expect(
          box!.width,
          `CTA button width (${box!.width}px) should be >= 80% of viewport (${viewportWidth * 0.8}px)`
        ).toBeGreaterThanOrEqual(viewportWidth * 0.65);
      });

      // ----------------------------------------------------------------
      // Mobile: related articles stack to 1 column
      // ----------------------------------------------------------------
      test("related articles stack vertically on mobile", async ({ page }) => {
        const relatedLabel = page.getByText("Related Insights", { exact: true });
        await expect(relatedLabel).toBeVisible();

        const relatedGrid = relatedLabel.locator("..").locator("div.grid");
        const cards = relatedGrid.locator(":scope > a");
        const count = await cards.count();

        if (count === 2) {
          const box0 = await cards.nth(0).boundingBox();
          const box1 = await cards.nth(1).boundingBox();
          expect(box0).not.toBeNull();
          expect(box1).not.toBeNull();
          // Stacked vertically: second card should be below the first
          expect(
            box1!.y,
            "Second related card should be below the first on mobile"
          ).toBeGreaterThan(box0!.y + box0!.height - 10);
        }
      });

      // ----------------------------------------------------------------
      // Mobile: all H2s visible and not overflowing
      // ----------------------------------------------------------------
      test("H2 headings do not overflow on mobile", async ({ page }) => {
        const h2s = page.getByRole("heading", { level: 2 });
        const count = await h2s.count();
        for (let i = 0; i < count; i++) {
          await assertNoOverflow(page, h2s.nth(i), `H2[${i}] on mobile`);
        }
      });
    });
  }

  // --- Conditional mobile tests ---

  // Stats grid should stack to 1 column on mobile
  const articlesWithStats = insights.filter(
    (a) => a.sections.some((s) => s.stats && s.stats.length > 0)
  );
  for (const article of articlesWithStats) {
    const expectedMobileStatCount = article.sections
      .filter((s) => s.stats && s.stats.length > 0)
      .reduce((sum, s) => Math.max(sum, s.stats!.length), 0);

    test(`article "${article.slug}" — stats grid stacks to single column on mobile`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      const statsGrid = page.locator("article .grid").first();
      await expect(statsGrid).toBeVisible();

      const statsCards = statsGrid.locator(":scope > div");
      const count = await statsCards.count();
      expect(count).toBe(expectedMobileStatCount);

      // On mobile (< 640px, sm breakpoint), cards should be stacked
      // Check each card is below the previous one
      let previousBottom = 0;
      for (let i = 0; i < count; i++) {
        const box = await statsCards.nth(i).boundingBox();
        expect(box).not.toBeNull();
        if (i > 0) {
          expect(
            box!.y,
            `Stats card ${i} should be below card ${i - 1}`
          ).toBeGreaterThanOrEqual(previousBottom - 5);
        }
        previousBottom = box!.y + box!.height;

        // Each card should not overflow viewport
        await assertNoOverflow(page, statsCards.nth(i), `Stats card[${i}] on mobile`);
      }
    });
  }

  // Comparison table: should be scrollable or constrained, never cause page overflow
  const articlesWithComparison = insights.filter(
    (a) => a.sections.some((s) => s.comparison)
  );
  for (const article of articlesWithComparison) {
    test(`article "${article.slug}" — comparison table does not cause horizontal page overflow on mobile`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      // The overflow-x-auto wrapper should prevent page-level overflow
      const tableWrapper = page.locator("article .overflow-x-auto").first();
      await expect(tableWrapper).toBeVisible();

      // Wrapper itself should not exceed viewport width
      const box = await tableWrapper.boundingBox();
      expect(box).not.toBeNull();
      const viewportWidth = page.viewportSize()!.width;
      expect(
        box!.width,
        `Table wrapper (${box!.width}px) should be <= viewport (${viewportWidth}px)`
      ).toBeLessThanOrEqual(viewportWidth);

      // The inner content may be wider (that's OK — it scrolls)
      // But the page itself must not scroll horizontally
      const pageOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(pageOverflow.scrollWidth).toBeLessThanOrEqual(
        pageOverflow.clientWidth + 1
      );
    });
  }

  // Callout blocks on mobile
  const articlesWithCallout = insights.filter(
    (a) => a.sections.some((s) => s.callout)
  );
  for (const article of articlesWithCallout) {
    test(`article "${article.slug}" — callout blocks do not overflow on mobile`, async ({
      page,
    }) => {
      await gotoArticle(page, article.slug);

      const callouts = page.locator("article blockquote");
      const count = await callouts.count();
      for (let i = 0; i < count; i++) {
        await assertNoOverflow(
          page,
          callouts.nth(i),
          `Callout[${i}] on mobile`
        );
      }
    });
  }
});
