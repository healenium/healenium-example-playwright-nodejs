import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('XPath Locator API Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('XPath with special characters', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath with special characters before selector change
    const specialCharElement = page.locator('xpath=//*[@id="change:name"]');
    await expect(specialCharElement).toBeVisible();
    await specialCharElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath with special characters after selector change (should be healed)
    const healedSpecialCharElement = page.locator('xpath=//*[@id="change:name"]');
    await expect(healedSpecialCharElement).toBeVisible();
    await healedSpecialCharElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Following', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath following before selector change
    const followingElement = page.locator('xpath=//*[@id="change_className"]/following::test_tag');
    await expect(followingElement).toBeVisible();
    await followingElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath following after selector change (should be healed)
    const healedFollowingElement = page.locator('xpath=//*[@id="change_className"]/following::test_tag');
    await expect(healedFollowingElement).toBeVisible();
    await healedFollowingElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Contains', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath contains before selector change
    const containsElement = page.locator('xpath=//input[contains(@class, "test")]');
    await expect(containsElement).toBeVisible();
    await containsElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath contains after selector change (should be healed)
    const healedContainsElement = page.locator('xpath=//input[contains(@class, "test")]');
    await expect(healedContainsElement).toBeVisible();
    await healedContainsElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath not contains before selector change
    const notContainsElement = page.locator('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await expect(notContainsElement).toBeVisible();
    await notContainsElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath not contains after selector change (should be healed)
    const healedNotContainsElement = page.locator('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await expect(healedNotContainsElement).toBeVisible();
    await healedNotContainsElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Following-Sibling', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    const followingSiblingElement = page.locator('xpath=//input[@class="test_class"]/following-sibling::*');
    await expect(followingSiblingElement).toHaveClass('shadow-input1');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath following-sibling after selector change (should be healed)
    const healedFollowingSiblingElement = page.locator('xpath=//input[@class="test_class"]/following-sibling::*');
    await expect(healedFollowingSiblingElement).toHaveClass('shadow-input1');
  });

  test('XPath Ancestor', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath ancestor before selector change
    const ancestorElement = page.locator('xpath=(//*[starts-with(@class, "test")]/ancestor::div[@class="healenium-form validate-form"]//input)[1]');
    await expect(ancestorElement).toBeVisible();
    await ancestorElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath ancestor after selector change (should be healed)
    const healedAncestorElement = page.locator('xpath=(//*[starts-with(@class, "test")]/ancestor::div[@class="healenium-form validate-form"]//input)[1]');
    await expect(healedAncestorElement).toBeVisible();
    await healedAncestorElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath OR', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath OR before selector change
    const orElement = page.locator('xpath=//*[@id="change_id" or @id="omg"]');
    await expect(orElement).toBeVisible();
    await orElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath OR after selector change (should be healed)
    const healedOrElement = page.locator('xpath=//*[@id="change_id" or @id="omg"]');
    await expect(healedOrElement).toBeVisible();
    await healedOrElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath And', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath AND before selector change
    const andElement = page.locator('xpath=//*[@id="change_id" and @type="text"]');
    await expect(andElement).toBeVisible();
    await andElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath AND after selector change (should be healed)
    const healedAndElement = page.locator('xpath=//*[@id="change_id" and @type="text"]');
    await expect(healedAndElement).toBeVisible();
    await healedAndElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Starts-with', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath starts-with before selector change
    const startsWithElement = page.locator('xpath=//*[starts-with(@class, "test") and @name="Field2"]');
    await expect(startsWithElement).toBeVisible();
    await startsWithElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath starts-with after selector change (should be healed)
    const healedStartsWithElement =  page.locator('xpath=//*[starts-with(@class, "test") and @name="Field2"]');
    await expect(healedStartsWithElement).toBeVisible();
    await healedStartsWithElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Preceding', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath preceding before selector change
    const precedingElement = page.locator('xpath=//*[@id="change_className"]/preceding::*[@id="change_id"]');
    await expect(precedingElement).toBeVisible();
    await precedingElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath preceding after selector change (should be healed)
    const healedPrecedingElement = page.locator('xpath=//*[@id="change_className"]/preceding::*[@id="change_id"]');
    await expect(healedPrecedingElement).toBeVisible();
    await healedPrecedingElement.press('Enter', { timeout: TIMEOUT });
  });

  test('XPath Descendant', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept()); 
    // Find element by XPath descendant before selector change
    const descendantElement = page.locator('xpath=//*[@id="descendant_change"]/descendant::input');
    await expect(descendantElement).toBeVisible();
    await descendantElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath descendant after selector change (should be healed)
    const healedDescendantElement = page.locator('xpath=//*[@id="descendant_change"]/descendant::input');
    await expect(healedDescendantElement).toBeVisible();
    await healedDescendantElement.press('Enter', { timeout: TIMEOUT });
  });

});

