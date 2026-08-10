import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 3000;

test.describe('Locator API - Information Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('textContent method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('#select_item option[value="1"]');
    const textContent = await inputField.textContent({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('#select_item option[value="1"]');
    const healedTextContent = await healedInputField.textContent({ timeout: TIMEOUT });
    expect(healedTextContent).toBe(textContent);
  });

  test('innerText method', async ({ page }) => {
    test.slow();
    const element = page.locator('[name="dragRed"]');
    const innerText = await element.innerText({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedElement = page.locator('[name="dragRed"]');
    const healedInnerText = await healedElement.innerText({ timeout: TIMEOUT });
    expect(healedInnerText).toBe(innerText);
  });

  test('innerHTML method', async ({ page }) => {
    test.slow();
    const element = page.locator('[name="dragRed"]');
    const innerHTML = await element.innerHTML({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedElement = page.locator('[name="dragRed"]');
    const healedInnerHTML = await healedElement.innerHTML({ timeout: TIMEOUT });
    expect(healedInnerHTML).toBe(innerHTML);
  });

  test('inputValue method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Test value', { timeout: TIMEOUT });
    const inputValue = await inputField.inputValue({ timeout: TIMEOUT });
    expect(inputValue).toBe('Test value');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.fill('Test value', { timeout: TIMEOUT });
    const healedInputValue = await healedInputField.inputValue({ timeout: TIMEOUT });
    expect(healedInputValue).toBe('Test value');
  });

  test('getAttribute method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const attribute = await inputField.getAttribute('name', { timeout: TIMEOUT });
    expect(attribute).toBe("Field2");

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedAttribute = await healedInputField.getAttribute('name', { timeout: TIMEOUT });
    expect(healedAttribute).toBe("Field2");
  });

  test('boundingBox method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('#select_item');
    const boundingBox = await inputField.boundingBox({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('#select_item');
    const healedBoundingBox = await healedInputField.boundingBox({ timeout: TIMEOUT });
    expect(healedBoundingBox!.width).toBe(boundingBox!.width);
    expect(healedBoundingBox!.height).toBe(boundingBox!.height);
  });

  test('isEnabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isEnabled = await inputField.isEnabled({ timeout: TIMEOUT });
    expect(isEnabled).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedIsEnabled = await healedInputField.isEnabled({ timeout: TIMEOUT });
    expect(healedIsEnabled).toBe(true);
  });

  test('isDisabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isDisabled = await inputField.isDisabled({ timeout: TIMEOUT });
    expect(isDisabled).toBe(false);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedIsDisabled = await healedInputField.isDisabled({ timeout: TIMEOUT });
    expect(healedIsDisabled).toBe(false);
  });

  test('isEditable method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isInputEditable = await inputField.isEditable({ timeout: TIMEOUT });
    expect(isInputEditable).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedIsInputEditable = await healedInputField.isEditable({ timeout: TIMEOUT });
    expect(healedIsInputEditable).toBe(true);
  });

  /*
      Can not heal 'isVisible' and 'isHidden' due to success/fail ambiguity
      // IS VISIBLE
      const isInputVisible = await inputField.isVisible({ timeout });
      // {"id":24,"guid":"frame@270394fb70b41528f6132d58fd4cb769","method":"isVisible","params":{"selector":".test_class","strict":true},"metadata":{}}
      // {"id":24,"result":{"value":true}}  - success
      // {"id":24,"result":{"value":false}} - there is no element with such 'selector'

      // IS HIDDEN
      const isInputHidden = await inputField.isHidden({ timeout });
      // {"id":26,"guid":"frame@270394fb70b41528f6132d58fd4cb769","method":"isHidden","params":{"selector":".test_class","strict":true},"metadata":{}}
      // {"id":26,"result":{"value":false}} - success
      // {"id":26,"result":{"value":true}}  - there is no element with such 'selector'
  */
});
