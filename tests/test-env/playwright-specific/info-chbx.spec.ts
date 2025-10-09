import { test, expect } from '@playwright/test';

const TIMEOUT = 3000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - Checkbox Information Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('isChecked', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');

    await checkbox.check({ timeout: TIMEOUT });
    const isCheckboxChecked = await checkbox.isChecked({ timeout: TIMEOUT });
    expect(isCheckboxChecked).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedCheckbox = page.locator('input.input1#form_checked1');
    await healedCheckbox.check({ timeout: TIMEOUT });
    const healedIsCheckboxChecked = await healedCheckbox.isChecked({ timeout: TIMEOUT });
    expect(healedIsCheckboxChecked).toBe(true);
  });

});

