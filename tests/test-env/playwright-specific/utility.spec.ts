import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

test.describe('Locator API - Utility Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('describe action', async ({ page }) => {
    test.slow();
    // describe affects only selector's value
    const changeIdInput = page.locator('input#change_id')
      .describe('Primary input field that changes ID and TagName');

    const changeClassInput = page.locator('.test_class')
      .describe('Input field that changes ClassName');

    // Use the described locators
    await changeIdInput.click({ timeout: TIMEOUT });
    await changeClassInput.fill('Test description', { timeout: TIMEOUT });

    await expect(changeIdInput).toBeVisible();
    await expect(changeClassInput).toHaveValue('Test description');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedChangeIdInput = page.locator('input#change_id')
      .describe('Primary input field that changes ID and TagName');

    const healedChangeClassInput = page.locator('.test_class')
      .describe('Input field that changes ClassName');

    await healedChangeIdInput.click({ timeout: TIMEOUT });
    await healedChangeClassInput.fill('Test description', { timeout: TIMEOUT });

    await expect(healedChangeIdInput).toBeVisible();
    await expect(healedChangeClassInput).toHaveValue('Test description');
  });


  test('ariaSnapshot action', async ({ page }) => {
    test.slow();
    // Get ARIA snapshot of individual input
    const changeIdInput = page.locator('input#change_id');
    const inputAriaSnapshot = await changeIdInput.ariaSnapshot({ timeout: TIMEOUT });
    const stringifiedInputAriaSnapshot = JSON.stringify(inputAriaSnapshot, null, 2);

    // Verify snapshot contain expected properties
    expect(inputAriaSnapshot).toBeDefined();
    expect(stringifiedInputAriaSnapshot).toContain('textbox');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedChangeIdInput = page.locator('input#change_id');
    const healedInputAriaSnapshot = await healedChangeIdInput.ariaSnapshot({ timeout: TIMEOUT });
    const healedStringifiedInputAriaSnapshot = JSON.stringify(healedInputAriaSnapshot, null, 2);

    // Verify snapshot contain expected properties
    expect(healedInputAriaSnapshot).toBeDefined();
    expect(healedStringifiedInputAriaSnapshot).toContain('textbox');
  });

  test('dispatch event action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const childTag = page.locator('child_tag#change_element_last_child');
    const testTag = page.locator('test_tag#change_element');
    const changeNameInput = page.locator('input[name="change_name"]');

    await inputField.dispatchEvent('keydown', { key: 'A', timeout: TIMEOUT });
    await childTag.dispatchEvent('customEvent', { detail: 'custom data', timeout: TIMEOUT });
    await testTag.dispatchEvent('click', { timeout: TIMEOUT });
    await changeNameInput.dispatchEvent('input', { data: 'test', timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedChildTag = page.locator('child_tag#change_element_last_child');
    const healedTestTag = page.locator('test_tag#change_element');
    const healedChangeNameInput = page.locator('input[name="change_name"]');

    await healedInputField.dispatchEvent('keydown', { key: 'A' }, { timeout: TIMEOUT });
    await healedChildTag.dispatchEvent('customEvent', { detail: 'custom data' }, { timeout: TIMEOUT });
    await healedTestTag.dispatchEvent('click', {}, { timeout: TIMEOUT });
    await healedChangeNameInput.dispatchEvent('input', { data: 'test' }, { timeout: TIMEOUT });
  });

  test('waitFor action', async ({ page }) => {
    test.slow();
    const testClassInput = page.locator('.test_class');

    await testClassInput.waitFor({ state: 'visible', timeout: TIMEOUT });

    await testClassInput.fill('WaitFor test', { timeout: TIMEOUT });
    await expect(testClassInput).toHaveValue('WaitFor test', { timeout: TIMEOUT });

    // Wait for element to be attached (more general than visible)
    await testClassInput.waitFor({ state: 'attached', timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedTestClassInput = page.locator('.test_class');

    await healedTestClassInput.waitFor({ state: 'visible', timeout: TIMEOUT });

    await healedTestClassInput.fill('WaitFor test', { timeout: TIMEOUT });
    await expect(healedTestClassInput).toHaveValue('WaitFor test', { timeout: TIMEOUT });

    // Wait for element to be attached (more general than visible)
    await healedTestClassInput.waitFor({ state: 'attached', timeout: TIMEOUT });
  });

  test('waitFor action with strict mode', async ({ page }) => {
    test.slow();
    const testClassInput = page.locator('.test_class');

    // Wait with strict mode (will fail if multiple elements match)
    await testClassInput.waitFor({
      state: 'visible',
      timeout: TIMEOUT,
      strict: true
    });

    await expect(testClassInput).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedTestClassInput = page.locator('.test_class');

    // Wait with strict mode (will fail if multiple elements match)
    await healedTestClassInput.waitFor({
      state: 'visible',
      timeout: TIMEOUT,
      strict: true
    });

    await expect(healedTestClassInput).toBeVisible({ timeout: TIMEOUT });
  });

});
