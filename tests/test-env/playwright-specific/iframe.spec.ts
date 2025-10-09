import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - iframe - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('iframe', async ({ page }) => {
    test.slow();

    // Iframe
    const iframe = page.frameLocator('iframe[title="Iframe Example"]');
    await expect(iframe.getByPlaceholder('Change: Id')).toBeVisible();
    // iframe[title="Iframe Example"] >> internal:control=enter-frame >> internal:attr=[placeholder="Change: Id and TagName"i]
    await expect(iframe.locator('input[placeholder="Change: Id"]')).toBeVisible();
    // 
    // By ID (most reliable)
    await expect(iframe.locator('#iframe_input')).toBeVisible();

  });


});

