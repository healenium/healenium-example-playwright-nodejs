import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - iFrame Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });
/*
  test('iframe input click action', async ({ page }) => {
    test.slow();
    
    // Get the iframe element
    const iframe = page.frameLocator('iframe[title="Iframe Example"]');
    
    await expect(iframe).toBeVisible();


    // Test input field in iframe before selector change
    const inputField = iframe.locator('#iframe_input');
    await inputField.click({ timeout: TIMEOUT });
    await expect(inputField).toBeVisible();

    // Click Change locators button in iframe to test healing
    const submitBtn = iframe.locator('#iframe_Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = iframe.locator('#iframe_input');
    await healedInputField.click({ timeout: TIMEOUT });
    await expect(healedInputField).toBeVisible();
  });

  test('iframe select option action', async ({ page }) => {
    test.slow();
    
    // Get the iframe element
    const iframe = page.frameLocator('iframe[title="Iframe Example"]');
    
    // Test select element in iframe before selector change
    const selectElement = iframe.locator('#iframe_select_item');
    await selectElement.selectOption({ label: 'iframe Item 1' }, { timeout: TIMEOUT });
    await expect(selectElement).toHaveValue('11');

    // Click Change locators button in iframe to test healing
    const submitBtn = iframe.locator('#iframe_Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedSelectElement = iframe.locator('#iframe_select_item');
    await healedSelectElement.selectOption({ label: 'iframe Item 2' }, { timeout: TIMEOUT });
    await expect(healedSelectElement).toHaveValue('22');
  });
*/
});

