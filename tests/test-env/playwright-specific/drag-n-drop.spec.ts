import { test } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

test.describe('Locator API - Drag Ang Drop - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('source - playwright-specific', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('.drag-container').getByText('Green Item');
    const droppableElement = page.locator('#drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('.drag-container').getByText('Green Item');
    const healedDroppableElement = page.locator('#drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('source - XPath', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('//div[@class="drag-container"]/div[@name="dragRed"]');
    const droppableElement = page.locator('#drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('//div[@class="drag-container"]/div[@name="dragRed"]');
    const healedDroppableElement = page.locator('#drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('target - playwright-specific', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('.drag-container').getByText('Green Item');
    const droppableElement = page.getByTestId('testid_drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('.drag-container').getByText('Green Item');
    const healedDroppableElement = page.getByTestId('testid_drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('target - CSS', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('.drag-container').getByText('Green Item');
    const droppableElement = page.locator('#drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('.drag-container').getByText('Green Item');
    const healedDroppableElement = page.locator('#drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('source and target - playwright-specific both', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('.drag-container').getByText('Green Item');
    const droppableElement = page.getByTestId('testid_drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();
    await page.locator('#Submit_checkbox').click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('.drag-container').getByText('Green Item');
    const healedDroppableElement = page.getByTestId('testid_drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('source and target - XPath, CSS', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('//div[@class="drag-container"]/div[@name="dragRed"]');
    const droppableElement = page.locator('#drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();
    await page.locator('#Submit_checkbox').click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('//div[@class="drag-container"]/div[@name="dragRed"]');
    const healedDroppableElement = page.locator('#drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('source and target - XPath, playwright-specific', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('//div[@class="drag-container"]/div[@name="dragRed"]');
    const droppableElement = page.getByTestId('testid_drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();
    await page.locator('#Submit_checkbox').click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('//div[@class="drag-container"]/div[@name="dragRed"]');
    const healedDroppableElement = page.getByTestId('testid_drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });

  test('source and target - playwright-specific, CSS', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('.drag-container').getByText('Green Item');
    const droppableElement = page.locator('#drop1');
    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();
    await page.locator('#Submit_checkbox').click();

    // Test healing - same action should work after locator change
    const healedDraggableElement = page.locator('.drag-container').getByText('Green Item');
    const healedDroppableElement = page.locator('#drop1');
    await healedDraggableElement.dragTo(healedDroppableElement, { timeout: TIMEOUT });
  });


  test('page.dragAndDrop', async ({ page }) => {
    test.slow();

    await page.dragAndDrop('//div[@class="drag-container"]/div[@name="dragRed"]', '#drop1', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();
    await page.locator('#Submit_checkbox').click();

    // Test healing - same action should work after locator change
    await page.dragAndDrop('//div[@class="drag-container"]/div[@name="dragRed"]', '#drop1', { timeout: TIMEOUT });
  });

});
