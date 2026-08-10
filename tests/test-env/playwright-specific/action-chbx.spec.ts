import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

test.describe('Locator API - CheckBox Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('check action', async ({ page }) => {
    test.slow();

    const checkbox = page.locator('input.input1#form_checked1');
    await checkbox.check({ timeout: TIMEOUT });
    await expect(checkbox).toBeChecked();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedCheckbox = page.locator('input.input1#form_checked1');
    await healedCheckbox.check({ timeout: TIMEOUT });
    await expect(healedCheckbox).toBeChecked();
  });

  test('uncheck action', async ({ page }) => {
    test.slow();
    const checkbox2 = page.locator('input.input1#form_checked2');
    await checkbox2.uncheck({ timeout: TIMEOUT });
    await expect(checkbox2).not.toBeChecked();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedCheckbox2 = page.locator('input.input1#form_checked2');
    await healedCheckbox2.uncheck({ timeout: TIMEOUT });
    await expect(healedCheckbox2).not.toBeChecked();
  });

  test('set checked True action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');
    await checkbox.setChecked(true, { timeout: TIMEOUT });
    await expect(checkbox).toBeChecked();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedCheckbox = page.locator('input.input1#form_checked1');
    await healedCheckbox.setChecked(true, { timeout: TIMEOUT });
    await expect(healedCheckbox).toBeChecked();
  });

  test('set checked False action', async ({ page }) => {
    test.slow();
    const checkbox2 = page.locator('input.input1#form_checked2');
    await checkbox2.setChecked(false, { timeout: TIMEOUT });
    await expect(checkbox2).not.toBeChecked();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedCheckbox2 = page.locator('input.input1#form_checked2');
    await healedCheckbox2.setChecked(false, { timeout: TIMEOUT });
    await expect(healedCheckbox2).not.toBeChecked();
  });

  test('set checked with force action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');
    await checkbox.setChecked(true, {
      force: true,
      timeout: TIMEOUT
    });
    await expect(checkbox).toBeChecked();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedCheckbox = page.locator('input.input1#form_checked1');
    await healedCheckbox.setChecked(true, {
      force: true,
      timeout: TIMEOUT
    });
    await expect(healedCheckbox).toBeChecked();
  });

});
