import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';
const TIMEOUT = 5000;

test.describe('Deprecated ElementHandle Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('elementHandle() method - get single ElementHandle (deprecated)', async ({ page }) => {
    const inputHandle = await page.locator('.test_class').elementHandle({ timeout: TIMEOUT });
    expect(inputHandle).toBeTruthy();
    await inputHandle!.fill('New text value');
    expect(await inputHandle!.inputValue()).toBe('New text value');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInputHandle = await page.locator('.test_class').elementHandle({ timeout: TIMEOUT });
    expect(healedInputHandle).toBeTruthy();
    expect(await healedInputHandle!.inputValue()).toBe('New text value');

  });

});
