import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('Simple Locator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Update locator for element with css id', async ({ page }) => {
    test.slow();
    const idElement = await page.$('#change_id');
    expect(await idElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS ID after selector change (should be healed)
    const changeIdElement = await page.$('#change_id');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await changeIdElement!.isVisible()).toBe(true);
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    const enabledElement = await page.$('textarea:enabled');
    expect(await enabledElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = await page.$('textarea:enabled');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await changedEnabledElement!.isVisible()).toBe(true);
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();
    const notContainsElement = await page.$('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    expect(await notContainsElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath not contains after selector change (should be healed)
    const changedNotContainsElement = await page.$('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await changedNotContainsElement!.isVisible()).toBe(true);
  });
  
});
