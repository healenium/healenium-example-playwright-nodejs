/**
 * Healing behaviour for Playwright expect(locator) accessibility/special assertion methods.
 *
 * Not applicable for healing:
 * - toHaveAccessibleDescription 
 * - toHaveAccessibleName  
 * - toHaveScreenshot 
 * - toHaveTitle
 * - toHaveURL
 *
 * @see https://playwright.dev/docs/test-assertions
 */
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Expect - Special Assertions (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('toMatchAriaSnapshot', async ({ page }) => {
    test.slow();
    const snapshot = '- text: Drop Zone';
    const loc = page.locator('#drop1');
    await expect(loc).toMatchAriaSnapshot(snapshot, { timeout: TIMEOUT });

    await page.locator('#Submit_checkbox').click();

    const healed = page.locator('#drop1');
    await expect(healed).toMatchAriaSnapshot(snapshot, { timeout: TIMEOUT });
  });

});
