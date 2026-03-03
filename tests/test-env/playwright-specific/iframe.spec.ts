import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

// Supports ONLY:
// XPath, CSS, id selectors 
// within all node path:
// frame selector 0 >> frame selector 1 >> ... >> element selector		

test.describe('Locator API - iframe - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('iframe - change frame title - input field expect', async ({ page }) => {
    test.slow();

    const iframe = page.frameLocator('iframe[title="Iframe Example"]');

    // Test input field in iframe before selector change
    const inputField = iframe.locator('#iframe_input');
    await expect(inputField).toBeVisible();

    // Click Change locators button in iframe to test healing
    const submitBtn = iframe.locator('#iframe_Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = iframe.locator('#iframe_input');
    await expect(healedInputField).toBeVisible();
  });

  test('iframe - change frame title - select option action', async ({ page }) => {
    test.slow();

    // Get the iframe element
    const iframe = page.frameLocator('iframe[title="Iframe Example"]');

    // Test select element in iframe before selector change
    const selectElement = iframe.locator('#iframe_select_item');
    await selectElement.selectOption({ label: 'iframe Item 1' }, { timeout: TIMEOUT });
    await expect(selectElement).toHaveValue('11');

    // Click Change locators button in iframe to test healing
    const submitBtn = iframe.locator('#iframe_Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedSelectElement = iframe.locator('#iframe_select_item');
    await healedSelectElement.selectOption({ label: 'iframe Item 2' }, { timeout: TIMEOUT });
    await expect(healedSelectElement).toHaveValue('22');
  });

  test('iframe - change all nested path', async ({ page }) => {
    test.slow();

    const inputField = page.frameLocator('iframe[title="Iframe Example"]').frameLocator('iframe[title="Nested iframe Example"]').locator('#iframe_2_input');
    await expect(inputField).toBeVisible();

    // Click iframe Change locators button 
    const iframeSubmitBtn = page.frameLocator('iframe[title="Iframe Example"]').locator('#iframe_Submit');
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });

    // Test healing - same action should work after locator change
    const healedInputField = page.frameLocator('iframe[title="Iframe Example"]').frameLocator('iframe[title="Nested iframe Example"]').locator('#iframe_2_input');
    await expect(healedInputField).toBeVisible();

  });
});
