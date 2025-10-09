import { test, expect } from '@playwright/test';

const TIMEOUT = 3000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - Information Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('textContent method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const textContent = await inputField.textContent({ timeout: TIMEOUT });
    console.log('Input textContent:', textContent);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedTextContent = await healedInputField.textContent({ timeout: TIMEOUT });
    console.log('Healed input textContent:', healedTextContent);
  });

  test('innerText method', async ({ page }) => {
    test.slow();
    const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    const innerText = await linkElement.innerText({ timeout: TIMEOUT });
    console.log('Link innerText:', innerText);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedLinkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    const healedInnerText = await healedLinkElement.innerText({ timeout: TIMEOUT });
    console.log('Healed link innerText:', healedInnerText);
  });

  test('innerHTML method', async ({ page }) => {
    test.slow();
    const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    const innerHTML = await linkElement.innerHTML({ timeout: TIMEOUT });
    console.log('Child tag innerHTML:', innerHTML);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedLinkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    const healedInnerHTML = await healedLinkElement.innerHTML({ timeout: TIMEOUT });
    console.log('Healed child tag innerHTML:', healedInnerHTML);
  });

  test('inputValue method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Test value', { timeout: TIMEOUT });
    const inputValue = await inputField.inputValue({ timeout: TIMEOUT });
    expect(inputValue).toBe('Test value');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

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
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedAttribute = await healedInputField.getAttribute('name', { timeout: TIMEOUT });
    expect(healedAttribute).toBe("Field2");
  });

  test('boundingBox method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const boundingBox = await inputField.boundingBox({ timeout: TIMEOUT });
    console.log('Input bounding box:', boundingBox);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedBoundingBox = await healedInputField.boundingBox({ timeout: TIMEOUT });
    console.log('Healed input bounding box:', healedBoundingBox);
  });

  test('isEnabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isEnabled = await inputField.isEnabled({ timeout: TIMEOUT });
    expect(isEnabled).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

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
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(500);

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
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    const healedIsInputEditable = await healedInputField.isEditable({ timeout: TIMEOUT });
    expect(healedIsInputEditable).toBe(true);
  });

  /*
      Can not save 'isVisible' and 'isHidden' due to success/fail ambiguity
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

