import { test, expect } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../helpers/goto';

const TIMEOUT = 3000;
const WAIT_TIMEOUT = 250;

test.describe('General Locator API Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('Button click with FindBy annotation', async ({ page }) => {
    test.slow();

    page.on('dialog', dialog => dialog.accept());

    const submitAlertBtn = page.locator('#submit_alert');
    await expect(submitAlertBtn).toBeVisible();
    await submitAlertBtn.click({ timeout: TIMEOUT });
    
    // Click element by change ID (before selector change)
    const changeIdElement = page.locator('#change_id');
    await changeIdElement.press('Enter', { timeout: TIMEOUT });

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Click element by change ID (after selector change - should be healed)
    const healedChangeIdElement = page.locator('#change_id');
    await healedChangeIdElement.press('Enter', { timeout: TIMEOUT });
  });

  test('Input fields click with FindBy annotation', async ({ page }) => {
    test.slow();

    // Test elements before selector change
    const testClassElement = page.locator('input.test_class');
    await expect(testClassElement).toBeVisible();
    await testClassElement.press('Enter');

    const testTagElement = page.locator('test_tag#change_element');
    await expect(testTagElement).toBeVisible();
    await testTagElement.isVisible();
    const classAttr = await testTagElement.getAttribute('class');
    console.log('classAttr', classAttr);
    expect(classAttr).toBe('shadow-input1');

    const changeNameElement = page.locator('input[name="change_name"]');
    await expect(changeNameElement).toBeVisible();

    const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    await expect(linkElement).toBeVisible();
    await linkElement.isVisible();
    const linkClassAttr = await linkElement.getAttribute('class');
    console.log('link classAttr', linkClassAttr);
    expect(linkClassAttr).toBe('input1');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test elements after selector change (should be healed)
    const healedTestClassElement = page.locator('input.test_class');
    await expect(healedTestClassElement).toBeVisible();
    await healedTestClassElement.press('Enter', { timeout: TIMEOUT });

    const healedTestTagElement = page.locator('test_tag#change_element');
    await expect(healedTestTagElement).toBeVisible();
    await healedTestTagElement.isVisible({ timeout: TIMEOUT });
    const healedClassAttr = await healedTestTagElement.getAttribute('class', { timeout: TIMEOUT });
    console.log('healedClassAttr', healedClassAttr);
    expect(healedClassAttr).toBe(classAttr);


    const healedChangeNameElement = page.locator('input[name="change_name"]');
    await expect(healedChangeNameElement).toBeVisible();
    await healedChangeNameElement.press('Enter', { timeout: TIMEOUT });

    const healedLinkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    await expect(healedLinkElement).toBeVisible();
    await healedLinkElement.isVisible();
    const healedLinkClassAttr = await healedLinkElement.getAttribute('class', { timeout: TIMEOUT });
    console.log('healed link classAttr', healedLinkClassAttr);
    expect(healedLinkClassAttr).toBe(linkClassAttr);
  });

  test('Checkbox verify with FindBy annotation', async ({ page }) => {
    test.slow();

    // Find checkboxes before selector change
    const checkbox1 = page.locator('input.input1#form_checked1');
    await expect(checkbox1).toBeVisible();
    const checkbox2 = page.locator('input.input1#form_checked2');
    await expect(checkbox2).toBeVisible();
    const checkbox3 = page.locator('input.input1#form_checked3');
    await expect(checkbox3).toBeVisible();

    // Click Submit checkbox button
    const submitCheckboxBtn = page.locator('#Submit_checkbox');
    await expect(submitCheckboxBtn).toBeVisible();
    await submitCheckboxBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find checkboxes after selector change (should be healed)
    const healedCheckbox1 = page.locator('input.input1#form_checked1');
    await expect(healedCheckbox1).toBeVisible();
    const healedCheckbox2 = page.locator('input.input1#form_checked2');
    await expect(healedCheckbox2).toBeVisible();
    const healedCheckbox3 = page.locator('input.input1#form_checked3');
    await expect(healedCheckbox3).toBeVisible();
  });

  test('Input field enable to disable with FindBy annotation', async ({ page }) => {
    test.slow();

    // Find element before selector change (should be enabled)
    const enabledElement = page.locator('#change_enabled');
    await expect(enabledElement).toBeVisible();
    expect(await enabledElement.isEnabled()).toBe(true);

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element after selector change (should be healed and now disabled)
    const disabledElement = page.locator('#change_enabled');
    await expect(disabledElement).toBeVisible();
    expect(await disabledElement.isDisabled()).toBe(true);
  });

  test('Checkbox checked to unchecked with FindBy annotation', async ({ page }) => {
    test.slow();

    // Find checkbox before selector change (should be checked)
    const checkedElement = page.locator('#change_checked');
    await expect(checkedElement).toBeVisible();
    expect(await checkedElement.isChecked()).toBe(true);

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find checkbox after selector change (should be healed and now unchecked)
    const uncheckedElement = page.locator('#change_checked');
    await expect(uncheckedElement).toBeVisible();
    expect(await uncheckedElement.isChecked()).toBe(false);
  });

});

