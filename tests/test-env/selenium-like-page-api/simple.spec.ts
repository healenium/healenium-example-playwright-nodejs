import { test, expect } from '@playwright/test';

const TIMEOUT = 9000;
const WAIT_TIMEOUT = 450;

test.describe('Simple Locator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Update locator for element with css id', async ({ page }) => {
    test.slow();
    const idElement = await page.$('#change_id');
    expect(idElement).not.toBeNull();
    expect(await idElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS ID after selector change (should be healed)
    const changeIdElement = await page.$('#change_id');
    expect(changeIdElement).not.toBeNull();
    expect(await changeIdElement!.isVisible()).toBe(true);
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    const enabledElement = await page.$('textarea:enabled');
    expect(enabledElement).not.toBeNull();
    expect(await enabledElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = await page.$('textarea:enabled');
    expect(changedEnabledElement).not.toBeNull();
    expect(await changedEnabledElement!.isVisible()).toBe(true);
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();
    const notContainsElement = await page.$('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    expect(notContainsElement).not.toBeNull();
    expect(await notContainsElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath not contains after selector change (should be healed)
    const changedNotContainsElement = await page.$('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    expect(changedNotContainsElement).not.toBeNull();
    expect(await changedNotContainsElement!.isVisible()).toBe(true);
  });
  
});

