import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('CSS 1 Locator Tests', () => {

  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/', { waitUntil: 'domcontentloaded' });

    // Click add square button and verify square element
    const addSquareBtn = await page.$('//button[contains(@class, "add")]');
    await addSquareBtn!.click({ timeout: TIMEOUT });

    // Verify square element exists
    const squareElement = await page.$('custom-square[color="red"]');
    const visible = await squareElement!.isVisible({ timeout: TIMEOUT });
    expect(visible).toBe(true);

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      // Click update square button
      const updateSquareBtn = await page.$('//button[contains(@class, "update")]');
      await updateSquareBtn!.click({ timeout: TIMEOUT });
      await page.waitForTimeout(WAIT_TIMEOUT);

      // Verify square element still exists (should be healed)
      const healedSquareElement = await page.$('custom-square[color="red"]');
      await page.waitForTimeout(WAIT_TIMEOUT);
      const healedVisible = await healedSquareElement!.isVisible({ timeout: TIMEOUT });
      expect(healedVisible).toBe(true);
    }
  });
});
