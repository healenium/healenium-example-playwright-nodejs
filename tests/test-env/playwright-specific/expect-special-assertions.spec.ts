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
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

test.describe('Expect - Special Assertions (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
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
