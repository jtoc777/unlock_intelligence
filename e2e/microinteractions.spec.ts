/**
 * What: E2E tests for hover/active microinteractions.
 * Why: Guards subtle CSS interactions against regression.
 * How: Playwright hover/click + computed style assertions.
 * Deps: Playwright, localhost dev server.
 */
import { test, expect } from "@playwright/test";

// Increase timeout — hover tests need animation settling time
test.setTimeout(60_000);

// Only run on desktop — hover states don't apply on mobile/touch
test.describe("Microinteractions — desktop only", () => {
  test.skip(({ isMobile }) => isMobile, "hover tests are desktop-only");

  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  // ---------------------------------------------------------------------------
  // 1. Accordion — single chevron rotation
  // ---------------------------------------------------------------------------

  test("accordion chevron rotates 180deg when expanded", async ({ page }) => {
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();

    const firstTrigger = faq
      .locator('[data-slot="accordion-trigger"]')
      .first();
    await expect(firstTrigger).toBeVisible({ timeout: 5000 });

    const chevron = firstTrigger.locator("svg");

    // Click to expand and wait for aria-expanded
    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute("aria-expanded", "true", {
      timeout: 3000,
    });

    // Verify rotation completed (Tailwind v4 uses `rotate` property)
    await page.waitForTimeout(400);
    const rotate = await chevron.evaluate(
      (el) => getComputedStyle(el).rotate
    );
    expect(rotate).toBe("180deg");
  });

  test("accordion has only one chevron icon per trigger", async ({ page }) => {
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();

    const firstTrigger = faq
      .locator('[data-slot="accordion-trigger"]')
      .first();

    // Should have exactly 1 SVG icon, not 2
    const svgCount = await firstTrigger.locator("svg").count();
    expect(svgCount).toBe(1);
  });

  test("accordion trigger does not underline on hover", async ({ page }) => {
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();

    const firstTrigger = faq
      .locator('[data-slot="accordion-trigger"]')
      .first();

    await firstTrigger.hover();
    await page.waitForTimeout(200);

    const textDecoration = await firstTrigger.evaluate(
      (el) => getComputedStyle(el).textDecorationLine
    );
    expect(textDecoration).toBe("none");
  });

  // ---------------------------------------------------------------------------
  // 2. Button hover lift
  // ---------------------------------------------------------------------------

  test("primary CTA lifts on hover", async ({ page }) => {
    const ctaButton = page
      .locator("#hero")
      .getByRole("link", { name: /custom proposal/i });

    await expect(ctaButton).toBeVisible();

    // Get resting transform
    const beforeTransform = await ctaButton.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.translate || s.transform;
    });

    await ctaButton.hover();
    await page.waitForTimeout(250);

    const afterTransform = await ctaButton.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.translate || s.transform;
    });

    expect(afterTransform).not.toBe(beforeTransform);
  });

  // ---------------------------------------------------------------------------
  // 3. Arrow nudge on CTA hover
  // ---------------------------------------------------------------------------

  test("CTA arrow nudges right on hover", async ({ page }) => {
    const ctaButton = page
      .locator("#hero")
      .getByRole("link", { name: /custom proposal/i });
    const arrow = ctaButton.locator("span[aria-hidden='true']");

    await expect(arrow).toBeVisible();

    const beforeTransform = await arrow.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.translate || s.transform;
    });

    await ctaButton.hover();
    await page.waitForTimeout(250);

    const afterTransform = await arrow.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.translate || s.transform;
    });

    expect(afterTransform).not.toBe(beforeTransform);
  });

  test("all CTA arrows have aria-hidden attribute", async ({ page }) => {
    const arrowSpans = page.locator(
      '[data-slot="button"] span[aria-hidden="true"]'
    );
    const count = await arrowSpans.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // ---------------------------------------------------------------------------
  // 4. Glass card hover warmth
  // ---------------------------------------------------------------------------

  test("glass card border brightens on hover", async ({ page }) => {
    const deliverables = page.locator("#deliverables");
    await deliverables.scrollIntoViewIfNeeded();

    // GlassCard has data-slot or we target by class pattern
    const cards = deliverables.locator(".rounded-xl.border");
    const card = cards.first();
    await expect(card).toBeVisible();

    const beforeBorder = await card.evaluate(
      (el) => getComputedStyle(el).borderColor
    );

    await card.hover();
    await page.waitForTimeout(350);

    const afterBorder = await card.evaluate(
      (el) => getComputedStyle(el).borderColor
    );

    expect(afterBorder).not.toBe(beforeBorder);
  });

  // ---------------------------------------------------------------------------
  // 5. Team photo scale
  // ---------------------------------------------------------------------------

  test("team photo scales subtly on hover", async ({ page }) => {
    const team = page.locator("#team");
    await team.scrollIntoViewIfNeeded();

    const photo = team.locator("img").first();
    await expect(photo).toBeVisible();

    const beforeScale = await photo.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.scale || s.transform;
    });

    await photo.hover();
    await page.waitForTimeout(800);

    const afterScale = await photo.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.scale || s.transform;
    });

    expect(afterScale).not.toBe(beforeScale);
  });

  // ---------------------------------------------------------------------------
  // 6. Pricing card — team training border hover
  // ---------------------------------------------------------------------------

  test("team training card border intensifies on hover", async ({ page }) => {
    const enroll = page.locator("#enroll");
    await enroll.scrollIntoViewIfNeeded();

    // The recommended card container — find by the "Team Training" heading
    const card = enroll
      .locator(".rounded-xl")
      .filter({ hasText: "Team Training" })
      .first();
    await expect(card).toBeVisible();

    const beforeBorder = await card.evaluate(
      (el) => getComputedStyle(el).borderColor
    );

    await card.hover();
    await page.waitForTimeout(350);

    const afterBorder = await card.evaluate(
      (el) => getComputedStyle(el).borderColor
    );

    expect(afterBorder).not.toBe(beforeBorder);
  });
});
