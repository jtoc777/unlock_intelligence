/**
 * What: Light smoke tests for deployment verification.
 * Why: Quick sanity check after Vercel/Cloudflare deploy.
 * How: Checks critical pages load, key content renders, links work.
 * Deps: Playwright. Set DEPLOYMENT_URL env var to test against a deploy.
 *
 * Usage:
 *   DEPLOYMENT_URL=https://preview-abc.vercel.app npx playwright test e2e/deploy-smoke.spec.ts
 *   npx playwright test e2e/deploy-smoke.spec.ts  (falls back to localhost:3000)
 */
import { test, expect } from "@playwright/test";

const BASE = process.env.DEPLOYMENT_URL ?? "http://localhost:3000";

test.describe("Deploy smoke tests", () => {
  // ---------------------------------------------------------------------------
  // 1. Homepage loads and renders key content
  // ---------------------------------------------------------------------------

  test("homepage returns 200 and renders hero", async ({ page }) => {
    const response = await page.goto(BASE, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);

    // Hero headline visible
    await expect(page.locator("#hero h1")).toBeVisible({ timeout: 10_000 });
    const headline = await page.locator("#hero h1").innerText();
    expect(headline).toContain("AI");
  });

  test("homepage has all critical sections", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });

    const sectionIds = [
      "hero",
      "problem",
      "how-it-works",
      "deliverables",
      "curriculum",
      "team",
      "enroll",
      "faq",
    ];

    for (const id of sectionIds) {
      await expect(
        page.locator(`#${id}`),
        `Section #${id} should exist`
      ).toBeAttached();
    }
  });

  // ---------------------------------------------------------------------------
  // 2. Contact page loads
  // ---------------------------------------------------------------------------

  test("contact page returns 200 and renders form", async ({ page }) => {
    const response = await page.goto(`${BASE}/contact`, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  // ---------------------------------------------------------------------------
  // 3. Insights hub loads
  // ---------------------------------------------------------------------------

  test("insights page returns 200 and lists articles", async ({ page }) => {
    const response = await page.goto(`${BASE}/insights`, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    // At least one article card should be visible
    await expect(page.locator("article, a[href*='/insights/']").first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test("first insight article page loads", async ({ page }) => {
    await page.goto(`${BASE}/insights`, { waitUntil: "domcontentloaded" });
    const firstLink = page.locator("a[href*='/insights/']").first();
    await expect(firstLink).toBeVisible();

    const href = await firstLink.getAttribute("href");
    const articleUrl = href?.startsWith("http") ? href : `${BASE}${href}`;
    const response = await page.goto(articleUrl, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  // ---------------------------------------------------------------------------
  // 4. Navigation links resolve (no 404s)
  // ---------------------------------------------------------------------------

  test("navbar links all resolve to 200", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });

    const navLinks = page.locator("nav a[href]");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.includes("#")) {
        hrefs.push(href.startsWith("http") ? href : `${BASE}${href}`);
      }
    }

    // Deduplicate
    const unique = [...new Set(hrefs)];
    for (const url of unique) {
      const response = await page.goto(url, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status(), `${url} should return 200`).toBe(200);
    }
  });

  // ---------------------------------------------------------------------------
  // 5. No console errors on any page
  // ---------------------------------------------------------------------------

  test("no console errors on homepage", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto(BASE, { waitUntil: "networkidle" });
    expect(errors).toEqual([]);
  });

  // ---------------------------------------------------------------------------
  // 6. Static assets load (fonts, images)
  // ---------------------------------------------------------------------------

  test("critical images load without errors", async ({ page }) => {
    const failedImages: string[] = [];
    page.on("response", (response) => {
      const url = response.url();
      if (
        (url.endsWith(".jpg") ||
          url.endsWith(".jpeg") ||
          url.endsWith(".png") ||
          url.endsWith(".webp") ||
          url.endsWith(".svg")) &&
        response.status() >= 400
      ) {
        failedImages.push(`${response.status()} ${url}`);
      }
    });

    await page.goto(BASE, { waitUntil: "networkidle" });
    // Scroll through the page to trigger lazy images
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" })
    );
    await page.waitForTimeout(2000);

    expect(failedImages, "All images should load").toEqual([]);
  });

  // ---------------------------------------------------------------------------
  // 7. Meta tags for SEO
  // ---------------------------------------------------------------------------

  test("homepage has title and meta description", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });

    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.length).toBeGreaterThan(10);
  });
});
