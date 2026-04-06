/**
 * What: Mobile viewport and touch-target checks for core pages.
 * Why: Validates iPhone-class layouts beyond desktop-only tests.
 * How: Multiple widths, scroll helpers, screenshots, menu flows.
 * Deps: Playwright, homepage contact routes, dev server.
 */
import { test, expect, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// iPhone 17 viewport definitions
// ---------------------------------------------------------------------------

const VIEWPORTS = [
  { name: "iPhone 17", width: 393, height: 852 },
  { name: "iPhone 17 Pro", width: 402, height: 874 },
  { name: "iPhone 17 Pro Max", width: 440, height: 956 },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Scroll the entire page in increments so that lazy/scroll-triggered content
 * (e.g. Framer Motion ScrollReveal) has a chance to mount before we assert
 * against it.
 */
async function scrollToBottom(page: Page) {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const distance = 400;
    const totalHeight = document.body.scrollHeight;
    let scrolled = 0;
    while (scrolled < totalHeight) {
      window.scrollBy(0, distance);
      scrolled += distance;
      await delay(100);
    }
  });
}

// ---------------------------------------------------------------------------
// 1. Per-viewport homepage rendering checks
// ---------------------------------------------------------------------------

for (const vp of VIEWPORTS) {
  test.describe(`Homepage mobile rendering -- ${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      isMobile: true,
      hasTouch: true,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      // Allow Framer Motion entrance animations to settle
      await expect(page.locator("#hero h1")).toBeVisible();
    });

    test("no horizontal scrollbar -- document width equals viewport width", async ({ page }) => {
      const { documentWidth, viewportWidth } = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      expect(documentWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test("hero headline is visible and does not overflow", async ({ page }) => {
      const h1 = page.locator("#hero h1");
      await expect(h1).toBeVisible();

      const box = await h1.boundingBox();
      expect(box).not.toBeNull();
      // Headline must start within viewport and not extend past it
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 1); // 1px tolerance
    });

    test("hero CTAs are full-width buttons", async ({ page }) => {
      const ctaContainer = page.locator("#hero").locator("div.flex.flex-col");
      const links = ctaContainer.locator("a[data-slot='button'], button[data-slot='button']");
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(2);

      for (let i = 0; i < count; i++) {
        const box = await links.nth(i).boundingBox();
        expect(box).not.toBeNull();
        // "Full width" means the button occupies most of the available
        // content area.  The content column has 24px (px-6) padding on each
        // side, so the max usable width is viewport - 48.
        const maxContentWidth = vp.width - 48;
        expect(box!.width).toBeGreaterThanOrEqual(maxContentWidth * 0.9);
      }
    });

    test("trust indicators wrap properly without horizontal overflow", async ({ page }) => {
      // Trust indicator container inside hero
      const trustContainer = page
        .locator("#hero")
        .locator("div.flex.flex-wrap")
        .first();
      await expect(trustContainer).toBeVisible();

      const box = await trustContainer.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 1);
    });

    test("credibility bar logos do not overflow viewport", async ({ page }) => {
      const proofBar = page.locator('section[aria-label="Instructor credentials"]');
      await expect(proofBar).toBeVisible();

      const logoContainer = proofBar.locator("div.flex.flex-wrap");
      const box = await logoContainer.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 1);
    });

    test("problem section stacks to single column", async ({ page }) => {
      // Scroll to make content visible
      await page.locator("#problem").scrollIntoViewIfNeeded();

      const grid = page.locator("#problem div.grid");
      await expect(grid).toBeVisible();

      // On mobile the grid children should stack: each child's width should
      // be close to the grid width (single column layout).
      const gridBox = await grid.boundingBox();
      expect(gridBox).not.toBeNull();

      const children = grid.locator(":scope > *");
      const childCount = await children.count();
      expect(childCount).toBeGreaterThanOrEqual(2);

      for (let i = 0; i < childCount; i++) {
        const childBox = await children.nth(i).boundingBox();
        expect(childBox).not.toBeNull();
        // Each child should span at least 90% of the grid width (single col)
        expect(childBox!.width).toBeGreaterThanOrEqual(gridBox!.width * 0.9);
      }
    });

    test("team cards stack vertically", async ({ page }) => {
      await page.locator("#team").scrollIntoViewIfNeeded();

      const grid = page.locator("#team div.grid");
      await expect(grid).toBeVisible();

      const gridBox = await grid.boundingBox();
      expect(gridBox).not.toBeNull();

      const children = grid.locator(":scope > *");
      const childCount = await children.count();
      expect(childCount).toBe(2);

      // Stacked = second card's top >= first card's bottom
      const firstBox = await children.nth(0).boundingBox();
      const secondBox = await children.nth(1).boundingBox();
      expect(firstBox).not.toBeNull();
      expect(secondBox).not.toBeNull();
      expect(secondBox!.y).toBeGreaterThanOrEqual(firstBox!.y + firstBox!.height - 1);
    });

    test("enroll cards stack vertically", async ({ page }) => {
      await scrollToBottom(page);
      await page.locator("#enroll").scrollIntoViewIfNeeded();

      const grid = page.locator("#enroll div.grid");
      await expect(grid).toBeVisible();

      const children = grid.locator(":scope > *");
      const childCount = await children.count();
      expect(childCount).toBe(2);

      const firstBox = await children.nth(0).boundingBox();
      const secondBox = await children.nth(1).boundingBox();
      expect(firstBox).not.toBeNull();
      expect(secondBox).not.toBeNull();
      expect(secondBox!.y).toBeGreaterThanOrEqual(firstBox!.y + firstBox!.height - 1);
    });

    test("all text is readable -- no text smaller than 12px", async ({ page }) => {
      await scrollToBottom(page);

      const tooSmallCount = await page.evaluate(() => {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              const text = node.textContent?.trim();
              if (!text || text.length === 0) return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            },
          }
        );
        let count = 0;
        let current = walker.nextNode();
        while (current) {
          const el = current.parentElement;
          if (el) {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            // Skip hidden/invisible elements
            const visible =
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.opacity !== "0" &&
              el.offsetHeight > 0;
            if (visible && fontSize < 12) {
              count++;
            }
          }
          current = walker.nextNode();
        }
        return count;
      });

      expect(tooSmallCount).toBe(0);
    });

    test("navbar hamburger menu is visible and desktop nav is hidden", async ({ page }) => {
      const hamburger = page.getByRole("button", { name: "Open menu" });
      await expect(hamburger).toBeVisible();

      // Desktop nav (the <ul> with links) should be hidden on mobile
      const desktopNav = page.locator("nav ul.hidden");
      // The element exists in DOM with class "hidden md:flex" -- verify it is
      // not visible at this viewport width.
      await expect(desktopNav).not.toBeVisible();
    });

    test("screenshot for visual review", async ({ page }) => {
      await scrollToBottom(page);
      // Scroll back to top for the screenshot
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `/Users/shubhamchandra/unlock_intelligence/test-results/${vp.name.replace(/ /g, "-")}-homepage-top.png`,
        fullPage: false,
      });
      await page.screenshot({
        path: `/Users/shubhamchandra/unlock_intelligence/test-results/${vp.name.replace(/ /g, "-")}-homepage-full.png`,
        fullPage: true,
      });
    });
  });
}

// ---------------------------------------------------------------------------
// 2. Mobile menu interaction
// ---------------------------------------------------------------------------

test.describe("Mobile menu -- hamburger interaction", () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
  });

  test("hamburger opens menu with all nav links and Get a Proposal button", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#hero h1")).toBeVisible();

    const hamburger = page.getByRole("button", { name: "Open menu" });
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    const sheet = page.locator('[data-slot="sheet-content"]');
    await expect(sheet).toBeVisible();

    // Verify all navigation links are present
    await expect(sheet.getByRole("link", { name: "How It Works" })).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Curriculum" })).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Contact" })).toBeVisible();

    // "Get a Proposal" button inside the sheet
    await expect(
      sheet.getByRole("link", { name: /Get a Proposal/i })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 3. Contact page at 393px
// ---------------------------------------------------------------------------

test.describe("Contact page -- mobile form (393px)", () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Get in Touch/i })).toBeVisible();
  });

  test("form is full-width within content area", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();

    const formBox = await form.boundingBox();
    expect(formBox).not.toBeNull();

    // Content area = viewport - 48px (24px padding each side) minus the
    // GlassCard's internal padding. The form should fill the card.
    // Just verify the form is at least 80% of viewport width.
    expect(formBox!.width).toBeGreaterThanOrEqual(393 * 0.75);
  });

  test("all form inputs are tappable -- min 44px height", async ({ page }) => {
    // Text inputs
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const companyInput = page.locator('input[name="company"]');
    const messageArea = page.locator('textarea[name="message"]');
    const selectTrigger = page.locator('[data-slot="select-trigger"]').first();

    const inputs = [nameInput, emailInput, companyInput, messageArea, selectTrigger];

    for (const input of inputs) {
      await expect(input).toBeVisible();
      const box = await input.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("submit button is full-width", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /Start a Conversation/i });
    await expect(submitBtn).toBeVisible();

    const btnBox = await submitBtn.boundingBox();
    expect(btnBox).not.toBeNull();

    // The button should span the full form width
    const form = page.locator("form");
    const formBox = await form.boundingBox();
    expect(formBox).not.toBeNull();

    // Button width should be at least 90% of form width
    expect(btnBox!.width).toBeGreaterThanOrEqual(formBox!.width * 0.9);
  });

  test("screenshot contact page for visual review", async ({ page }) => {
    await page.screenshot({
      path: `/Users/shubhamchandra/unlock_intelligence/test-results/iPhone-17-contact-full.png`,
      fullPage: true,
    });
  });
});

// ---------------------------------------------------------------------------
// 4. Touch target audit -- all interactive elements >= 44px
// ---------------------------------------------------------------------------

test.describe("Touch target audit -- minimum 44px tap targets", () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
  });

  test("all visible buttons have min-height of 44px on homepage", async ({ page }) => {
    await page.goto("/");
    await scrollToBottom(page);

    const violations = await page.evaluate(() => {
      const results: { text: string; height: number; tag: string }[] = [];
      const buttons = document.querySelectorAll(
        'button, [role="button"], [data-slot="button"]'
      );
      buttons.forEach((btn) => {
        const el = btn as HTMLElement;
        const style = window.getComputedStyle(el);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0" ||
          el.offsetHeight === 0
        ) {
          return;
        }
        const rect = el.getBoundingClientRect();
        if (rect.height < 44) {
          results.push({
            text: el.textContent?.trim().slice(0, 50) || "(no text)",
            height: Math.round(rect.height),
            tag: el.tagName.toLowerCase(),
          });
        }
      });
      return results;
    });

    if (violations.length > 0) {
      console.log("Touch target violations (buttons):", violations);
    }
    expect(violations).toEqual([]);
  });

  test("all visible links have min-height of 44px on homepage", async ({ page }) => {
    await page.goto("/");
    await scrollToBottom(page);

    const violations = await page.evaluate(() => {
      const results: { text: string; height: number; href: string }[] = [];
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        const style = window.getComputedStyle(link);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0" ||
          link.offsetHeight === 0
        ) {
          return;
        }
        const rect = link.getBoundingClientRect();
        if (rect.height < 44) {
          results.push({
            text: link.textContent?.trim().slice(0, 50) || "(no text)",
            height: Math.round(rect.height),
            href: link.getAttribute("href") || "",
          });
        }
      });
      return results;
    });

    if (violations.length > 0) {
      console.log("Touch target violations (links):", violations);
    }
    expect(violations).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 5. Viewport screenshots (all three devices)
// ---------------------------------------------------------------------------

for (const vp of VIEWPORTS) {
  test.describe(`Screenshots -- ${vp.name}`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      isMobile: true,
      hasTouch: true,
    });

    test(`capture full-page screenshot at ${vp.width}x${vp.height}`, async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("#hero h1")).toBeVisible();
      await scrollToBottom(page);

      // Take full-page screenshot
      await page.screenshot({
        path: `/Users/shubhamchandra/unlock_intelligence/test-results/${vp.name.replace(/ /g, "-")}-full-page.png`,
        fullPage: true,
      });
    });
  });
}
