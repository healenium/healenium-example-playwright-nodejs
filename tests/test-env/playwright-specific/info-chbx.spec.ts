import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';

const TIMEOUT = 3000;

test.describe('Locator API - Checkbox Information Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('isChecked', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');

    await checkbox.check({ timeout: TIMEOUT });
    const isCheckboxChecked = await checkbox.isChecked({ timeout: TIMEOUT });
    expect(isCheckboxChecked).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedCheckbox = page.locator('input.input1#form_checked1');
    await healedCheckbox.check({ timeout: TIMEOUT });
    const healedIsCheckboxChecked = await healedCheckbox.isChecked({ timeout: TIMEOUT });
    expect(healedIsCheckboxChecked).toBe(true);
  });

});
