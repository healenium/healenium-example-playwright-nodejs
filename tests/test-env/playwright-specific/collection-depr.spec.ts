import { test, expect } from '@playwright/test';
const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Deprecated ElementHandle Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('elementHandle() method - get single ElementHandle (deprecated)', async ({ page }) => {
    const inputHandle = await page.locator('.test_class').elementHandle({ timeout: TIMEOUT });
    expect(inputHandle).toBeTruthy();
    await inputHandle!.fill('New text value');
    expect(await inputHandle!.inputValue()).toBe('New text value');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();  
    await page.waitForTimeout(WAIT_TIMEOUT);

    const healedInputHandle = await page.locator('.test_class').elementHandle({ timeout: TIMEOUT });
    expect(healedInputHandle).toBeTruthy();
    expect(await healedInputHandle!.inputValue()).toBe('New text value');

  });

});

