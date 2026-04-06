/**
 * What: Playwright checks insights pages for horizontal overflow.
 * Why: Catches mobile drag and layout regressions early.
 * How: Visits each slug, scrolls, asserts scrollWidth versus viewport.
 * Deps: Playwright, dev server, src/data/insights slugs.
 */
import { test, expect, type Page } from "@playwright/test";
import { insights } from "../src/data/insights";

async function scrollInSteps(page: Page) {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = 400;
    const max = document.documentElement.scrollHeight;
    let y = 0;
    while (y < max) {
      window.scrollBy(0, step);
      y += step;
      await delay(80);
    }
  });
}

async function assertNoPageHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => {
    const el = document.documentElement;
    const body = document.body;
    return {
      docScrollWidth: el.scrollWidth,
      docClientWidth: el.clientWidth,
      docScrollLeft: el.scrollLeft,
      bodyScrollLeft: body.scrollLeft,
    };
  });

  // Page-level horizontal scroll (rubber-band / drag) — scrollWidth must not exceed viewport.
  // Do not assert on descendant bounding boxes: wide children inside overflow-x-auto are OK.
  expect(metrics.docScrollWidth).toBeLessThanOrEqual(metrics.docClientWidth + 1);
  expect(metrics.docScrollLeft).toBe(0);
  expect(metrics.bodyScrollLeft).toBe(0);
}

// ---------------------------------------------------------------------------
// Desktop — insights index + every article
// ---------------------------------------------------------------------------

test.describe("Insights — desktop layout", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("insights index has no horizontal overflow", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await scrollInSteps(page);
    await assertNoPageHorizontalOverflow(page);
  });

  for (const article of insights) {
    test(`article "${article.slug}" has no horizontal overflow`, async ({ page }) => {
      await page.goto(`/insights/${article.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await scrollInSteps(page);
      await assertNoPageHorizontalOverflow(page);
    });
  }
});

// ---------------------------------------------------------------------------
// Mobile — same pages + horizontal pan should not move the page
// ---------------------------------------------------------------------------

test.describe("Insights — mobile (iPhone-style)", () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
  });

  test("insights index — no horizontal overflow", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await scrollInSteps(page);
    await assertNoPageHorizontalOverflow(page);
  });

  for (const article of insights) {
    test(`article "${article.slug}" — no horizontal overflow`, async ({ page }) => {
      await page.goto(`/insights/${article.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await scrollInSteps(page);
      await assertNoPageHorizontalOverflow(page);
    });
  }

  test("horizontal pointer drag does not shift document", async ({ page }) => {
    await page.goto("/insights/ai-training-budget-line-item");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await scrollInSteps(page);

    const box = await page.locator("main").boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + Math.min(200, box!.height / 2);

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 140, startY, { steps: 8 });
    await page.mouse.up();

    const after = await page.evaluate(() => ({
      scrollLeft: document.documentElement.scrollLeft,
      bodyScrollLeft: document.body.scrollLeft,
    }));
    expect(after.scrollLeft).toBe(0);
    expect(after.bodyScrollLeft).toBe(0);
  });
});
