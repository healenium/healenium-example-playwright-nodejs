import { test, expect } from '@playwright/test';
import { gotoTestEnv } from '../../helpers/goto';

/** Same landing URL as mobitru-playwright-demo/tests/mobitru.landing.spec.js */
const MOBITRU_LANDING_URL = 'https://mobitru.com/';

/**
 * Successful Mobitru landing cases under Healenium (single-match locators / expects).
 * Contrast with unsupported Mobitru terms (.all() + scroll) repro.
 */
test.describe('Mobitru landing - supported', () => {
  test.describe.configure({ timeout: 150_000 });

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await gotoTestEnv(page, MOBITRU_LANDING_URL);

    // DesktopMainPage.acceptOneTrust()
    const oneTrustAccept = page.locator("button[id*='onetrust-accept-btn']");
    if (await oneTrustAccept.isVisible({ timeout: 10_000 }).catch(() => false)) {
      await oneTrustAccept.click();
    }
  });

  // Port of mobitru.landing.spec.js "Check elements in the Header"
  test('Check elements in the Header', async ({ page }) => {
    const softExpect = expect.configure({ soft: true });

    // DesktopMainPage.checkLogoImageDisplayed()
    await softExpect(page.locator("a[class*='logo-img-link']"), 'check log image is visible')
      .toBeVisible();

    // DesktopMainPage.checkHeaderContactUsLinkText("Request a demo")
    await softExpect(page.locator("button[class*='request-demo']"), 'check text of contact us link')
      .toContainText('Request a demo');
  });
});
