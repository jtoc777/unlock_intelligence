import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

test("debug CTA visibility", async ({ page }) => {
  await page.goto("/insights/ai-training-budget-line-item");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Scroll fully to bottom and stay there
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = 300;
    let y = 0;
    const max = document.documentElement.scrollHeight;
    while (y < max) {
      window.scrollBy(0, step);
      y += step;
      await delay(100);
    }
    await delay(1500);
  });

  // Check if h3 exists in DOM at all
  const h3Count = await page.locator("h3").count();
  console.log("h3 elements in DOM:", h3Count);

  const allH3Texts = await page.locator("h3").allTextContents();
  console.log("h3 texts:", allH3Texts);

  // Check opacity of all scroll-reveal motion divs
  const info = await page.evaluate(() => {
    const results: string[] = [];

    const h3s = document.querySelectorAll("h3");
    h3s.forEach((h3, i) => {
      const rect = h3.getBoundingClientRect();
      const style = getComputedStyle(h3);
      results.push(
        "h3[" + i + "]: text=" + (h3.textContent || "").substring(0, 50) +
        " | visible=" + (rect.width > 0 && rect.height > 0) +
        " | opacity=" + style.opacity +
        " | display=" + style.display
      );

      let el: HTMLElement | null = h3.parentElement;
      let depth = 0;
      while (el && depth < 10) {
        const s = getComputedStyle(el);
        if (s.opacity !== "1") {
          results.push(
            "  ancestor[" + depth + "]: tag=" + el.tagName +
            " opacity=" + s.opacity +
            " class=" + el.className.substring(0, 80)
          );
        }
        el = el.parentElement;
        depth++;
      }
    });

    return results;
  });

  for (const line of info) {
    console.log(line);
  }

  await page.screenshot({ path: "test-results/cta-debug-bottom.png", fullPage: false });
  await page.screenshot({ path: "test-results/cta-debug-full.png", fullPage: true });
});
