import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Simple Locator API Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('Update locator for element with css id', async ({ page }) => {
    test.slow();
    const idElement = page.locator('#change_id');
    await expect(idElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS ID after selector change (should be healed)
    const changeIdElement = page.locator('#change_id');
    await expect(changeIdElement).toBeVisible();
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    const enabledElement = page.locator('textarea:enabled');
    await expect(enabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = page.locator('textarea:enabled');
    await expect(changedEnabledElement).toBeVisible();
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();    
    const notContainsElement = page.locator('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await expect(notContainsElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath not contains after selector change (should be healed)
    const changedNotContainsElement = page.locator('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await expect(changedNotContainsElement).toBeVisible();
  });
});

