import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

test.describe('Locator API - getBy - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('getByRole - img - alt', async ({ page }) => {
    test.slow();
    await expect(page.getByRole('img', { name: 'Healenium Logo' })).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByRole('img', { name: 'Healenium Logo' })).toBeVisible({ timeout: TIMEOUT });
  });

  test('getByRole - textbox - aria label', async ({ page }) => {
    test.slow();
    await expect(page.getByRole('textbox', { name: 'change_tag_aria_label' })).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByRole('textbox', { name: 'change_tag_aria_label' })).toBeVisible({ timeout: TIMEOUT });
  });

  test('getByRole - textbox - aria labelledby', async ({ page }) => {
    test.slow();
    await expect(page.getByRole('textbox', { name: 'Field labeled by' })).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByRole('textbox', { name: 'Field labeled by' })).toBeVisible({ timeout: TIMEOUT });

  });

  test('getByText', async ({ page }) => {
    test.slow();
    await expect(page.getByText('Green Item')).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByText('Green Item')).toBeVisible({ timeout: TIMEOUT });
  });

  test('getByLabel', async ({ page }) => {
    test.slow();
    await expect(page.getByLabel('Field with hover')).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByLabel('Field with hover')).toBeVisible({ timeout: TIMEOUT });

  });

  test('getByPlaceholder', async ({ page }) => {
    test.slow();
    await expect(page.getByPlaceholder('Change: TestId')).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByPlaceholder('Change: TestId')).toBeVisible({ timeout: TIMEOUT });
  });

  test('getByAltText', async ({ page }) => {
    test.slow();
    await expect(page.getByAltText('Healenium Logo')).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByAltText('Healenium Logo')).toBeVisible({ timeout: TIMEOUT });
  });

  test('getByTitle', async ({ page }) => {
    test.slow();
    await expect(page.getByTitle('Validate change test id')).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByTitle('Validate change test id')).toBeVisible({ timeout: TIMEOUT });
  });

  test('getByTestId', async ({ page }) => {
    test.slow();
    await expect(page.getByTestId('change_testId')).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByTestId('change_testId')).toBeVisible({ timeout: TIMEOUT });
  });

});
