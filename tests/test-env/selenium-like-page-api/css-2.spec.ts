import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('CSS 2 Locator Tests', () => {

  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('Update locator for element with css id with special character', async ({ page }) => {
    test.slow();
    // Find element by CSS ID with special character before selector change
    const changeNameElement = await page.$('input#change\\:name');
    expect(await changeNameElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS ID with special character after selector change (should be healed)
    const healedChangeNameElement = await page.$('input#change\\:name');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedChangeNameElement!.isVisible()).toBe(true);
  });

  test('Update locator for element with css Element', async ({ page }) => {
    test.slow();
    // Find element by CSS tag before selector change
    const testTagElement = await page.$('test_tag');
    expect(await testTagElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS tag after selector change (should be healed)
    const healedTestTagElement = await page.$('test_tag');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedTestTagElement!.isVisible()).toBe(true);
  });

  test('Update locator for element with css Disabled', async ({ page }) => {
    test.slow();
    // Find disabled element by CSS pseudo-selector before selector change
    const disabledElement = await page.$('input:disabled');
    expect(await disabledElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find disabled element by CSS pseudo-selector after selector change (should be healed)
    const healedDisabledElement = await page.$('input:disabled');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedDisabledElement!.isVisible()).toBe(true);
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    // Find enabled element by CSS pseudo-selector before selector change
    const enabledElement = await page.$('textarea:enabled');
    expect(await enabledElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const healedEnabledElement = await page.$('textarea:enabled');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedEnabledElement!.isVisible()).toBe(true);
  });

  test('Update locator for element with css ClassName', async ({ page }) => {
    test.slow();
    // Find element by CSS class before selector change
    const testClassElement = await page.$('.test_class');
    expect(await testClassElement!.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS class after selector change (should be healed)
    const healedTestClassElement = await page.$('.test_class');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedTestClassElement!.isVisible()).toBe(true);
  });
});
