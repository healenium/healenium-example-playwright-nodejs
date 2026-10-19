import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

// with FRAME_NODEPATH_PER_SELECTOR=false
// XPath, CSS, id selectors 
// within all node path:
// frame selector 0 >> frame selector 1 >> ... >> element selector		

// plyywright-spesific support with FRAME_NODEPATH_PER_SELECTOR=true

test.describe('Locator API - iframe - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('iframe - change frame title - input field expect', async ({ page }) => {
    test.slow();

    const iframe = page.frameLocator('iframe[title="Iframe Example"]');

    // Test input field in iframe before selector change
    const inputField = iframe.locator('#iframe_input');
    await inputField.click({ timeout: TIMEOUT });

    // Click Change locators button in iframe to test healing
    const submitBtn = iframe.locator('#iframe_Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = iframe.locator('#iframe_input');
    await healedInputField.click({ timeout: TIMEOUT });
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
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = page.frameLocator('iframe[title="Iframe Example"]').locator('#iframe_Submit');
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });

    // Test healing - same action should work after locator change
    const healedInputField = page.frameLocator('iframe[title="Iframe Example"]').frameLocator('iframe[title="Nested iframe Example"]').locator('#iframe_2_input');
    await healedInputField.click({ timeout: TIMEOUT });
  });

});
