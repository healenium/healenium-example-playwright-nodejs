import { test, expect } from '@playwright/test';
import { gotoTestEnv, MDN_CALLBACK_URL } from '../../../helpers/goto';
import fs from 'fs';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('CSS 1 Locator Tests', () => {

  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    test.slow();
    await gotoTestEnv(page, MDN_CALLBACK_URL);

    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env-callback.html', content, 'utf-8');

    // Click add square button and verify square element
    const addSquareBtn = page.locator('//button[contains(@class, "add")]');
    await expect(addSquareBtn).toBeVisible();
    await addSquareBtn.click({ timeout: TIMEOUT });

    content = await page.content();
    fs.writeFileSync('page-content/page-test-env-callback-1.html', content, 'utf-8');

    // Verify square element exists
    const squareElement = page.locator('custom-square[color="red"]');
    await expect(squareElement).toBeVisible();

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      console.log(`Healing test iteration ${i + 1}`);
      
      // Click update square button
      const updateSquareBtn = page.locator('//button[contains(@class, "update")]');
      await expect(updateSquareBtn).toBeVisible();
      await updateSquareBtn.click({ timeout: TIMEOUT });
      await page.waitForTimeout(WAIT_TIMEOUT);

      content = await page.content();
      fs.writeFileSync(`page-content/page-test-env-callback-${i + 2}.html`, content, 'utf-8');

      // Verify square element still exists (should be healed)
      const healedSquareElement = page.locator('custom-square[color="red"]');
      await expect(healedSquareElement).toBeVisible();
    }
  });

});

