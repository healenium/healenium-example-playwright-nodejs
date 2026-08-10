import { test } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('XPath Locator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('XPath with special characters', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept()); 
    // Find element by XPath with special characters before selector change
    const specialCharElement = await page.$('//*[@id="change:name"]');
    await specialCharElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath with special characters after selector change (should be healed)
    const healedSpecialCharElement = await page.$('//*[@id="change:name"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedSpecialCharElement!.press('Enter');
  });

  test('XPath Following', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath following before selector change
    const followingElement = await page.$('//*[@id="change_className"]/following::test_tag');
    await followingElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath following after selector change (should be healed)
    const healedFollowingElement = await page.$('//*[@id="change_className"]/following::test_tag');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedFollowingElement!.press('Enter');
  });

  test('XPath Contains', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath contains before selector change
    const containsElement = await page.$('//input[contains(@class, "test")]');
    await containsElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath contains after selector change (should be healed)
    const healedContainsElement = await page.$('//input[contains(@class, "test")]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedContainsElement!.press('Enter');
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath not contains before selector change
    const notContainsElement = await page.$('//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await notContainsElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath not contains after selector change (should be healed)
    const healedNotContainsElement = await page.$('//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedNotContainsElement!.press('Enter');
  });

  test('XPath Following-Sibling', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath following-sibling before selector change
    const followingSiblingElement = await page.$('//*[starts-with(@class, "test")]/following-sibling::*');
    await followingSiblingElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath following-sibling after selector change (should be healed)
    const healedFollowingSiblingElement = await page.$('//*[starts-with(@class, "test")]/following-sibling::*');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedFollowingSiblingElement!.press('Enter');
  });

  test('XPath Ancestor', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath ancestor before selector change
    const ancestorElement = await page.$('(//*[starts-with(@class, "test")]/ancestor::div[@class="healenium-form validate-form"]//input)[1]');
    await ancestorElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath ancestor after selector change (should be healed)
    const healedAncestorElement = await page.$('(//*[starts-with(@class, "test")]/ancestor::div[@class="healenium-form validate-form"]//input)[1]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedAncestorElement!.press('Enter');
  });

  test('XPath OR', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath OR before selector change
    const orElement = await page.$('//*[@id="change_id" or @id="omg"]');
    await orElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath OR after selector change (should be healed)
    const healedOrElement = await page.$('//*[@id="change_id" or @id="omg"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedOrElement!.press('Enter');
  });

  test('XPath And', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath AND before selector change
    const andElement = await page.$('//*[@id="change_id" and @type="text"]');
    await andElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath AND after selector change (should be healed)
    const healedAndElement = await page.$('//*[@id="change_id" and @type="text"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedAndElement!.press('Enter');
  });

  test('XPath Starts-with', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath starts-with before selector change
    const startsWithElement = await page.$('//*[starts-with(@class, "test")]');
    await startsWithElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath starts-with after selector change (should be healed)
    const healedStartsWithElement = await page.$('//*[starts-with(@class, "test")]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedStartsWithElement!.press('Enter');
  });

  test('XPath Preceding', async ({ page }) => {
    test.slow();
    page.on('dialog', dialog => dialog.accept());
    // Find element by XPath preceding before selector change
    const precedingElement = await page.$('//*[@id="change_className"]/preceding::*[@id="change_id"]');
    await precedingElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath preceding after selector change (should be healed)
    const healedPrecedingElement = await page.$('//*[@id="change_className"]/preceding::*[@id="change_id"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedPrecedingElement!.press('Enter');
  });

  test('XPath Descendant', async ({ page }) => {
    test.slow();  
    page.on('dialog', dialog => dialog.accept()); 
    // Find element by XPath descendant before selector change
    const descendantElement = await page.$('//*[@id="descendant_change"]/descendant::input');
    await descendantElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by XPath descendant after selector change (should be healed)
    const healedDescendantElement = await page.$('//*[@id="descendant_change"]/descendant::input');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedDescendantElement!.press('Enter');
  });

});
