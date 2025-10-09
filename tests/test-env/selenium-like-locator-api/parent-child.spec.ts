import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Parent-Child Locator API Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Select and verify several inputs CSS FirstChild', async ({ page }) => {
    test.slow();
    // Find element by CSS first-child pseudo-selector before selector change
    const firstChildElement = page.locator('test_tag:first-child');
    await expect(firstChildElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS first-child pseudo-selector after selector change (should be healed)
    const healedFirstChildElement = page.locator('test_tag:first-child');
    await expect(healedFirstChildElement).toBeVisible();
  });

  test('Select and verify several inputs CSS LastChild', async ({ page }) => {
    test.slow();
    // Find element by CSS last-child pseudo-selector before selector change
    const lastChildElement = page.locator('child_tag:last-child');
    await expect(lastChildElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS last-child pseudo-selector after selector change (should be healed)
    const healedLastChildElement = page.locator('child_tag:last-child');
    await expect(healedLastChildElement).toBeVisible();
  });
});

