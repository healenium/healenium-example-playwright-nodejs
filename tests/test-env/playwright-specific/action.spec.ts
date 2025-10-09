import { test, expect } from '@playwright/test';
import path from 'path';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('click action', async ({ page }) => {
    test.slow();

    const inputField = page.locator('.test_class');
    await inputField.click({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('double click action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.dblclick({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.dblclick({ timeout: TIMEOUT });
  });

  test('blur action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.blur({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.blur({ timeout: TIMEOUT });
  });

  test('fill and clear actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Hello World', { timeout: TIMEOUT });
    await expect(inputField).toHaveValue('Hello World');

    await inputField.clear({ timeout: TIMEOUT });
    await expect(inputField).toHaveValue('');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same actions should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.fill('Hello World', { timeout: TIMEOUT });
    await expect(healedInputField).toHaveValue('Hello World');

    await healedInputField.clear({ timeout: TIMEOUT });
    await expect(healedInputField).toHaveValue('');
  });

  test('type action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.type('Typing text slowly', { timeout: TIMEOUT });
    await expect(inputField).toHaveValue('Typing text slowly');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.type('Typing text slowly', { timeout: TIMEOUT });
    await expect(healedInputField).toHaveValue('Typing text slowlyTyping text slowly');
  });

  test('press sequentially action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.pressSequentially('Sequential typing', {
      delay: 100,
      timeout: TIMEOUT
    });
    await expect(inputField).toHaveValue('Sequential typing');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.pressSequentially('Sequential typing', {
      delay: 100,
      timeout: TIMEOUT
    });
    await expect(healedInputField).toHaveValue('Sequential typingSequential typing');
  });

  test('press action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.fill('Test text', { timeout: TIMEOUT });
    await inputField.press('Enter', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.fill('Test text', { timeout: TIMEOUT });
    await healedInputField.press('Enter', { timeout: TIMEOUT });
  });

  test('hover action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    // here might be Visual changes: 
    // If there are hover styles, they'll be visible (e.g., border color change, background color)
    await inputField.hover({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.hover({ timeout: TIMEOUT });
  });

  test('focus and blur actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.focus({ timeout: TIMEOUT });
    await expect(inputField).toBeFocused();
    await inputField.blur({ timeout: TIMEOUT });
    await expect(inputField).not.toBeFocused();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same actions should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.focus({ timeout: TIMEOUT });
    await expect(healedInputField).toBeFocused();
    await healedInputField.blur({ timeout: TIMEOUT });
    await expect(healedInputField).not.toBeFocused();
  });

  test('scroll into view if needed action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.scrollIntoViewIfNeeded({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(inputField).toBeVisible();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.scrollIntoViewIfNeeded({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(healedInputField).toBeVisible();
  });

  test('select text action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Text to select', { timeout: TIMEOUT });
    await inputField.selectText({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(inputField).toBeFocused();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.fill('Text to select', { timeout: TIMEOUT });
    await healedInputField.selectText({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(healedInputField).toBeFocused();
  });

  test('select Option action', async ({ page }) => {
    test.slow();
    const selectElement = page.locator('#select_item');
    await selectElement.selectOption({ label: 'Item 1' }, { timeout: TIMEOUT });

    // await selectElement.selectOption([{ value: '2' }, { value: '3' }], { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedSelectElement = page.locator('#select_item');
    await healedSelectElement.selectOption({ label: 'Item 1' }, { timeout: TIMEOUT });
    await expect(healedSelectElement).toHaveValue('1');
  });

  test('set Input Files action', async ({ page }) => {
    test.slow();
    const filePath = path.join(__dirname, '../../../test-data/test-file.txt');

    const inputFile = page.locator('#file_input');
    await inputFile.setInputFiles(filePath, { timeout: TIMEOUT });

    const value = await inputFile.inputValue({ timeout: TIMEOUT });
    console.log('Input value:', value);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputFile = page.locator('#file_input');
    await healedInputFile.setInputFiles(filePath, { timeout: TIMEOUT });

    const healedValue = await healedInputFile.inputValue({ timeout: TIMEOUT });

    expect(healedValue).toBe(value);
  });

  // won't test for a while because there are 'target' and 'source' instead of 'selector'
  // test('drag to action', async ({ page }) => {
  //   test.slow();
  //   // visually nothing noticeable will happen because the input isn't configured to be draggable
  //   // actually we should  test on elements that are designed to be draggable
  //   const inputField = page.locator('.test_class');
  //   const wrapDiv = page.locator('.shadow-input1');
  //   await inputField.dragTo(wrapDiv, { timeout: clickTimeout });
  // });

});

