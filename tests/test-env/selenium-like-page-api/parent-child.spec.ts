import { test, expect } from '@playwright/test';

const TIMEOUT = 9000;
const WAIT_TIMEOUT = 450;

test.describe('Parent-Child Locator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Select and verify several inputs CSS FirstChild', async ({ page }) => {
    test.slow();
    // Find element by CSS first-child pseudo-selector before selector change
    const firstChildElement = await page.$('test_tag:first-child');
    expect(firstChildElement).not.toBeNull();
    expect(await firstChildElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS first-child pseudo-selector after selector change (should be healed)
    const healedFirstChildElement = await page.$('test_tag:first-child');
    expect(healedFirstChildElement).not.toBeNull();
    expect(await healedFirstChildElement!.isVisible()).toBe(true);
  });

  test('Select and verify several inputs CSS LastChild', async ({ page }) => {
    test.slow();
    // Find element by CSS last-child pseudo-selector before selector change
    const lastChildElement = await page.$('child_tag:last-child');
    expect(lastChildElement).not.toBeNull();
    expect(await lastChildElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS last-child pseudo-selector after selector change (should be healed)
    const healedLastChildElement = await page.$('child_tag:last-child');
    expect(healedLastChildElement).not.toBeNull();
    expect(await healedLastChildElement!.isVisible()).toBe(true);
  });
});

