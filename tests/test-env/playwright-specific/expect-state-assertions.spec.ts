/**
 * Healing behaviour for Playwright expect(locator) state assertion methods.
 *
 * @see https://playwright.dev/docs/test-assertions
 */
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Expect - State Assertions (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('toBeAttached', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeAttached({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    const healed = page.locator('.test_class');
    await expect(healed).toBeAttached({ timeout: TIMEOUT });
  });

  test('toBeVisible', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    const healed = page.locator('.test_class');
    await expect(healed).toBeVisible({ timeout: TIMEOUT });
  });

  test('toBeHidden', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).not.toBeHidden({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    const healed = page.locator('.test_class');
    await expect(healed).not.toBeHidden({ timeout: TIMEOUT });
  });

  test('toBeChecked', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');
    await expect(checkbox).toBeChecked({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit_checkbox').click();

    // Test healing - same action should work after locator change
    const healedCheckbox = page.locator('input.input1#form_checked1');
    await expect(healedCheckbox).toBeChecked({ timeout: TIMEOUT });
  });

  test('toBeDisabled', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).not.toBeDisabled({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).not.toBeDisabled({ timeout: TIMEOUT });
  });

  test('toBeEnabled', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeEnabled({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).toBeEnabled({ timeout: TIMEOUT });
  });

  test('toBeEditable', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeEditable({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).toBeEditable({ timeout: TIMEOUT });
  });

  test('toBeEmpty', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeEmpty({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).toBeEmpty({ timeout: TIMEOUT });
  });

  test('toBeFocused', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await loc.focus({ timeout: TIMEOUT });
    await expect(loc).toBeFocused({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    // but this also shift focus to button, so the element is not focused
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await healed.focus({ timeout: TIMEOUT });
    await expect(healed).toBeFocused({ timeout: TIMEOUT });
  });

  test('toBeInViewport', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeInViewport({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    // but this also scrolls the page to the bottom, so the element is not in viewport
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await healed.focus({ timeout: TIMEOUT });
    await expect(healed).toBeInViewport({ timeout: TIMEOUT });
  });

});
