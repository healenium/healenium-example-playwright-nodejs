import { test, expect } from '@playwright/test';
import { gotoTestEnv } from '../../helpers/goto';

/** Same landing URL as mobitru-playwright-demo/tests/mobitru.landing.spec.js */
const MOBITRU_LANDING_URL = 'https://mobitru.com/';

/**
 * Port of Mobitru "Open end user terms" (mobitru.landing.spec.js + DesktopMainPage)
 * against the live Mobitru site — reproduces queryCount → waitForSelector(>> nth)
 * → scrollIntoViewIfNeeded under Healenium + CookiePro frame churn.
 */
test.describe('Mobitru landing - Open end user terms', () => {
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

  test('Open end user terms', async ({ page }) => {
    test.slow();
    const softExpect = expect.configure({ soft: true });

    // DesktopMainPage.clickTermsOfUseLink()
    await page.locator("a[href*='terms-of-use']").click();

    // DesktopMainPage.checkTermsOfTitle("Mobitru – End User Terms")
    await softExpect(page.locator("main[class*='terms'] h1"), 'check "terms of use" title')
      .toContainText('Mobitru – End User Terms');

    // DesktopMainPage.checkTermsOfTextPointsNotEmpty()
    const termsOfPoints = page.locator("//main[contains(@class,'terms')]//p[not(contains(.,'Last'))]");
    for (const point of await termsOfPoints.all()) {
      await point.scrollIntoViewIfNeeded();
      await softExpect(point, 'check "terms of use" text point is not empty')
        .toHaveText(/.+/);
    }
  });
});
