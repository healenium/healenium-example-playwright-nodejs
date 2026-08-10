import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';

const TIMEOUT = 5000;

test.describe('Expect - Property Assertions (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('toHaveAttribute', async ({ page }) => {
    test.slow();
    const loc = page.locator('#change_id');
    await expect(loc).toHaveAttribute('type', 'text', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#change_id');
    await expect(healed).toHaveAttribute('type', 'text', { timeout: TIMEOUT });
  });


  test('toHaveJSProperty', async ({ page }) => {
    test.slow();
    const loc = page.locator('#change_id');
    await expect(loc).toHaveJSProperty('type', 'text', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#change_id');
    await expect(healed).toHaveJSProperty('type', 'text', { timeout: TIMEOUT });

  });

  test('toHaveClass', async ({ page }) => {
    test.slow();
    const loc = page.locator('#change_id');
    await expect(loc).toHaveClass(/input1/, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#change_id');
    await expect(healed).toHaveClass(/input1/, { timeout: TIMEOUT });
  });

  test('toContainClass', async ({ page }) => {
    test.slow();
    const loc = page.locator('#change_id');
    await expect(loc).toContainClass('input1', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#change_id');
    await expect(healed).toContainClass('input1', { timeout: TIMEOUT });
  });

  test('toHaveCSS', async ({ page }) => {
    test.slow();
    const loc = page.locator('#change_id');
    await expect(loc).toHaveCSS('display', /block|inline-block|inline/, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#change_id');
    await expect(healed).toHaveCSS('display', /block|inline-block|inline/, { timeout: TIMEOUT });
  });

  test('toHaveId', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toHaveId('change_className', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).toHaveId('change_className', { timeout: TIMEOUT });
  });

  test('toHaveRole', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toHaveRole('textbox', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).toHaveRole('textbox', { timeout: TIMEOUT });
  });

  test('toContainText', async ({ page }) => {
    test.slow();
    const loc = page.locator('#select_item');

    await expect(loc).toContainText('Select an item', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#select_item');
    await expect(healed).toContainText('Select an item', { timeout: TIMEOUT });
  });

  test('toHaveText', async ({ page }) => {
    test.slow();
    const loc = page.locator('#drop1');
    await expect(loc).toHaveText('Drop Zone', { timeout: TIMEOUT });

    await page.locator('#Submit_checkbox').click();

    const healed = page.locator('#drop1');
    await expect(healed).toHaveText('Drop Zone', { timeout: TIMEOUT });
  });

  test('toHaveText multiline', async ({ page }) => {
    test.slow();
    const loc = page.locator('#select_item');
    await expect(loc).toHaveText(/Select an item\s+Item 1\s+Item 2\s+Item 3\s+Item 4/, { timeout: TIMEOUT });

    await page.locator('#Submit').click();

    const healed = page.locator('#select_item');
    await expect(healed).toHaveText(/Select an item\s+Item 1\s+Item 2\s+Item 3\s+Item 4/, { timeout: TIMEOUT });
  });

  test('toHaveValue', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await loc.fill('hello', { timeout: TIMEOUT });
    await expect(loc).toHaveValue('hello', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.test_class');
    await expect(healed).toHaveValue('hello', { timeout: TIMEOUT });
  });

  test('toHaveValues', async ({ page }) => {
    test.slow();
    const loc = page.locator('#select_item');
    await loc.selectOption([{ value: '1' }, { value: '2' }], { timeout: TIMEOUT });
    await expect(loc).toHaveValues(['1', '2'], { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#select_item');
    await expect(healed).toHaveValues(['1', '2'], { timeout: TIMEOUT });
  });

  test('toHaveCount', async ({ page }) => {
    test.slow();

    const loc = page.getByText('Green Item');
    await expect(loc).toHaveCount(1);

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.getByText('Green Item');
    await expect(healed).toHaveCount(1);
  });

});
