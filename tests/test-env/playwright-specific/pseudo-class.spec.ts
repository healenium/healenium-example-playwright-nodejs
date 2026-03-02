import { test, expect } from '@playwright/test';

const TIMEOUT = 3000;

test.describe('Locator API - pseudo-class selectors - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('text=', async ({ page }) => {
    test.slow();
    await expect(page.locator('text=Green Item')).toBeVisible();
    // Click Change locators button
    await page.locator('#Submit').click({ timeout: TIMEOUT });
    // Test healing - same action should work after locator change
    await expect(page.locator('text=Green Item')).toBeVisible();
  });

  test('data-testid=', async ({ page }) => {
    test.slow();
    await expect(page.locator('data-testid=change_testId')).toBeVisible();
    // Click Change locators button
    await page.locator('#Submit').click({ timeout: TIMEOUT });
    // Test healing - same action should work after locator change
    await expect(page.locator('data-testid=change_testId')).toBeVisible();
  });

  test('xpath=', async ({ page }) => {
    test.slow();
    await expect(page.locator('xpath=//input[@id="change_id"]')).toBeVisible();
    // Click Change locators button
    await page.locator('#Submit').click({ timeout: TIMEOUT });
    // Test healing - same action should work after locator change
    await expect(page.locator('xpath=//input[@id="change_id"]')).toBeVisible();
  });

  test('css=', async ({ page }) => {
    test.slow();
    await expect(page.locator('css=.test_class')).toBeVisible();
    // Click Change locators button
    await page.locator('#Submit').click({ timeout: TIMEOUT });
    // Test healing - same action should work after locator change
    await expect(page.locator('css=.test_class')).toBeVisible();
  });

  test('id=', async ({ page }) => {
    test.slow();
    await expect(page.locator('id=change_id')).toBeVisible();
    // Click Change locators button
    await page.locator('#Submit').click({ timeout: TIMEOUT });
    // Test healing - same action should work after locator change
    await expect(page.locator('id=change_id')).toBeVisible();
  });

});
