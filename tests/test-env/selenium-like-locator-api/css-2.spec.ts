import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('CSS 2 Locator Tests', () => {

  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('Update locator for element with css id with special character', async ({ page }) => {
    test.slow();

    // Find element by CSS ID with special character before selector change
    const changeNameElement = page.locator('input#change\\:name');
    await expect(changeNameElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS ID with special character after selector change (should be healed)
    const healedChangeNameElement = page.locator('input#change\\:name');
    await expect(healedChangeNameElement).toBeVisible();
  });

  test('Update locator for element with css Element', async ({ page }) => {
    test.slow();

    // Find element by CSS tag before selector change
    const testTagElement = page.locator('test_tag');
    await expect(testTagElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS tag after selector change (should be healed)
    const healedTestTagElement = page.locator('test_tag');
    await expect(healedTestTagElement).toBeVisible();
  });

  test('Update locator for element with css Disabled', async ({ page }) => {
    test.slow();

    // Find disabled element by CSS pseudo-selector before selector change
    const disabledElement = page.locator('input:disabled');
    await expect(disabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find disabled element by CSS pseudo-selector after selector change (should be healed)
    const healedDisabledElement = page.locator('input:disabled');
    await expect(healedDisabledElement).toBeVisible();
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    test.slow();

    // Find enabled element by CSS pseudo-selector before selector change
    const enabledElement = page.locator('textarea:enabled');
    await expect(enabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const healedEnabledElement = page.locator('textarea:enabled');
    await expect(healedEnabledElement).toBeVisible();
  });

  test('Update locator for element with css ClassName', async ({ page }) => {
    test.slow();
    
    // Find element by CSS class before selector change
    const testClassElement = page.locator('.test_class');
    await expect(testClassElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS class after selector change (should be healed)
    const healedTestClassElement = page.locator('.test_class');
    await expect(healedTestClassElement).toBeVisible();
  });
  
});

