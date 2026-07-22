import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('General Locator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Button click with FindBy annotation', async ({ page }) => {
    test.slow();
    // Set up dialog handler
    page.on('dialog', dialog => dialog.accept());

    // Click test button and confirm alert
    const submitAlertBtn = await page.$('#submit_alert');
    await submitAlertBtn!.click({ timeout: TIMEOUT });

    // Click element by change ID (before selector change)
    const changeIdElement = await page.$('#change_id');
    await changeIdElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Click element by change ID (after selector change - should be healed)
    const healedChangeIdElement = await page.$('#change_id');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedChangeIdElement!.press('Enter');
  });

  test('Input fields click with FindBy annotation', async ({ page }) => {
    test.slow();
    // Test elements before selector change
    const testClassElement = await page.$('input.test_class');
    await testClassElement!.press('Enter');

    const testTagElement = await page.$('test_tag#change_element');
    const classAttr = await testTagElement!.getAttribute('class');
    expect(classAttr).toBe('shadow-input1');
    await testTagElement!.isVisible();

    const changeNameElement = await page.$('input[name="change_name"]');
    await changeNameElement!.press('Enter');

    const linkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
    await linkElement!.isVisible();
    const linkClassAttr = await linkElement!.getAttribute('class');
    expect(linkClassAttr).toBe('input1');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    
    // Test elements after selector change (should be healed)
    const healedTestClassElement = await page.$('input.test_class');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedTestClassElement!.press('Enter');

    const healedTestTagElement = await page.$('test_tag#change_element');
    await page.waitForTimeout(WAIT_TIMEOUT);
    const healedClassAttr = await healedTestTagElement!.getAttribute('class');
    expect(healedClassAttr).toBe(classAttr);
    await healedTestTagElement!.isVisible();

    const healedChangeNameElement = await page.$('input[name="change_name"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedChangeNameElement!.press('Enter');

    const healedLinkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedLinkElement!.isVisible();
    const healedLinkClassAttr = await healedLinkElement!.getAttribute('class');
    expect(healedLinkClassAttr).toBe(linkClassAttr);
  });

  test('Checkbox verify with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find checkboxes before selector change
    const checkbox1 = await page.$('input.input1#form_checked1');
    expect(await checkbox1!.isVisible()).toBe(true);
    const checkbox2 = await page.$('input.input1#form_checked2');
    expect(await checkbox2!.isVisible()).toBe(true);
    const checkbox3 = await page.$('input.input1#form_checked3');
    expect(await checkbox3!.isVisible()).toBe(true);

    // Click Submit checkbox button
    const submitCheckboxBtn = await page.$('#Submit_checkbox');
    await submitCheckboxBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find checkboxes after selector change (should be healed)
    const healedCheckbox1 = await page.$('input.input1#form_checked1');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedCheckbox1!.isVisible()).toBe(true);
    const healedCheckbox2 = await page.$('input.input1#form_checked2');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedCheckbox2!.isVisible()).toBe(true);
    const healedCheckbox3 = await page.$('input.input1#form_checked3');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedCheckbox3!.isVisible()).toBe(true);
  });

  test('Input field enable to disable with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find element before selector change (should be enabled)
    const enabledElement = await page.$('#change_enabled');
    expect(await enabledElement!.isEnabled()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element after selector change (should be healed and now disabled)
    const disabledElement = await page.$('#change_enabled');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await disabledElement!.isDisabled()).toBe(true);
  });

  test('Checkbox checked to unchecked with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find checkbox before selector change (should be checked)
    const checkedElement = await page.$('#change_checked');
    expect(await checkedElement!.isChecked()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find checkbox after selector change (should be healed and now unchecked)
    const uncheckedElement = await page.$('#change_checked');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await uncheckedElement!.isChecked()).toBe(false);
  });
});
