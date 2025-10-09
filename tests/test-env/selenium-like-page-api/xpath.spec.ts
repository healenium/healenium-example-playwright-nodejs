import { test, expect } from '@playwright/test';

const TIMEOUT = 9000;
const WAIT_TIMEOUT = 450;

test.describe('XPath Locator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('XPath with special characters', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept()); 
    // Find element by XPath with special characters before selector change
    const specialCharElement = await page.$('//*[@id="change:name"]');
    expect(specialCharElement).not.toBeNull();
    await specialCharElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath with special characters after selector change (should be healed)
    const healedSpecialCharElement = await page.$('//*[@id="change:name"]');
    expect(healedSpecialCharElement).not.toBeNull();
    await healedSpecialCharElement!.press('Enter');
  });

  test('XPath Following', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath following before selector change
    const followingElement = await page.$('//*[@id="change_className"]/following::test_tag');
    expect(followingElement).not.toBeNull();
    await followingElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath following after selector change (should be healed)
    const healedFollowingElement = await page.$('//*[@id="change_className"]/following::test_tag');
    expect(healedFollowingElement).not.toBeNull();
    await healedFollowingElement!.press('Enter');
  });

  test('XPath Contains', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath contains before selector change
    const containsElement = await page.$('//input[contains(@class, "test")]');
    expect(containsElement).not.toBeNull();
    await containsElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath contains after selector change (should be healed)
    const healedContainsElement = await page.$('//input[contains(@class, "test")]');
    expect(healedContainsElement).not.toBeNull();
    await healedContainsElement!.press('Enter');
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath not contains before selector change
    const notContainsElement = await page.$('//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    expect(notContainsElement).not.toBeNull();
    await notContainsElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath not contains after selector change (should be healed)
    const healedNotContainsElement = await page.$('//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    expect(healedNotContainsElement).not.toBeNull();
    await healedNotContainsElement!.press('Enter');
  });

  test('XPath Following-Sibling', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath following-sibling before selector change
    const followingSiblingElement = await page.$('//*[starts-with(@class, "test")]/following-sibling::*');
    expect(followingSiblingElement).not.toBeNull();
    await followingSiblingElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath following-sibling after selector change (should be healed)
    const healedFollowingSiblingElement = await page.$('//*[starts-with(@class, "test")]/following-sibling::*');
    expect(healedFollowingSiblingElement).not.toBeNull();
    await healedFollowingSiblingElement!.press('Enter');
  });

  test('XPath Ancestor', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath ancestor before selector change
    const ancestorElement = await page.$('(//*[starts-with(@class, "test")]/ancestor::div[@class="healenium-form validate-form"]//input)[1]');
    expect(ancestorElement).not.toBeNull();
    await ancestorElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath ancestor after selector change (should be healed)
    const healedAncestorElement = await page.$('(//*[starts-with(@class, "test")]/ancestor::div[@class="healenium-form validate-form"]//input)[1]');
    expect(healedAncestorElement).not.toBeNull();
    await healedAncestorElement!.press('Enter');
  });

  test('XPath OR', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath OR before selector change
    const orElement = await page.$('//*[@id="change_id" or @id="omg"]');
    expect(orElement).not.toBeNull();
    await orElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath OR after selector change (should be healed)
    const healedOrElement = await page.$('//*[@id="change_id" or @id="omg"]');
    expect(healedOrElement).not.toBeNull();
    await healedOrElement!.press('Enter');
  });

  test('XPath And', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath AND before selector change
    const andElement = await page.$('//*[@id="change_id" and @type="text"]');
    expect(andElement).not.toBeNull();
    await andElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath AND after selector change (should be healed)
    const healedAndElement = await page.$('//*[@id="change_id" and @type="text"]');
    expect(healedAndElement).not.toBeNull();
    await healedAndElement!.press('Enter');
  });

  test('XPath Starts-with', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath starts-with before selector change
    const startsWithElement = await page.$('//*[starts-with(@class, "test")]');
    expect(startsWithElement).not.toBeNull();
    await startsWithElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath starts-with after selector change (should be healed)
    const healedStartsWithElement = await page.$('//*[starts-with(@class, "test")]');
    expect(healedStartsWithElement).not.toBeNull();
    await healedStartsWithElement!.press('Enter');
  });

  test('XPath Preceding', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath preceding before selector change
    const precedingElement = await page.$('//*[@id="change_className"]/preceding::*[@id="change_id"]');
    expect(precedingElement).not.toBeNull();
    await precedingElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath preceding after selector change (should be healed)
    const healedPrecedingElement = await page.$('//*[@id="change_className"]/preceding::*[@id="change_id"]');
    expect(healedPrecedingElement).not.toBeNull();
    await healedPrecedingElement!.press('Enter');
  });

  test('XPath Descendant', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept()); 
    // Find element by XPath descendant before selector change
    const descendantElement = await page.$('//*[@id="descendant_change"]/descendant::input');
    expect(descendantElement).not.toBeNull();
    await descendantElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath descendant after selector change (should be healed)
    const healedDescendantElement = await page.$('//*[@id="descendant_change"]/descendant::input');
    expect(healedDescendantElement).not.toBeNull();
    await healedDescendantElement!.press('Enter');
  });

});

