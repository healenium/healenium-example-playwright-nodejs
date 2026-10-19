import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

/**
 * Exercises Playwright Frame.queryCount (via locator.all()) against healenium-test-env.
 * Pre-action must not intercept queryCount (multi-match / non-strict).
 */
test.describe('Locator API - queryCount (locator.all) - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('locator.all - multi-match option list', async ({ page }) => {
    const options = page.locator('#select_item option');
    const all = await options.all();

    expect(all.length).toBeGreaterThan(1);
    for (const option of all) {
      await expect(option).toBeAttached();
      const text = await option.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});
