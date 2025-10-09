import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 9000;
const WAIT_TIMEOUT = 450;

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
    expect(submitAlertBtn).not.toBeNull();
    await submitAlertBtn!.click({ timeout: TIMEOUT });

    // Click element by change ID (before selector change)
    const changeIdElement = await page.$('#change_id');
    expect(changeIdElement).not.toBeNull();
    await changeIdElement!.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Click element by change ID (after selector change - should be healed)
    const healedChangeIdElement = await page.$('#change_id');
    expect(healedChangeIdElement).not.toBeNull();
    await healedChangeIdElement!.press('Enter');
  });

  test('Input fields click with FindBy annotation', async ({ page }) => {
    test.slow();
    // Test elements before selector change
    const testClassElement = await page.$('input.test_class');
    expect(testClassElement).not.toBeNull();
    await testClassElement!.press('Enter');

    const testTagElement = await page.$('test_tag#change_element');
    expect(testTagElement).not.toBeNull();
    const classAttr = await testTagElement!.getAttribute('class');
    console.log('classAttr', classAttr);
    expect(classAttr).toBe('shadow-input1');
    await testTagElement!.isVisible();

    const changeNameElement = await page.$('input[name="change_name"]');
    expect(changeNameElement).not.toBeNull();
    await changeNameElement!.press('Enter');

    const linkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
    expect(linkElement).not.toBeNull();
    await linkElement!.isVisible();
    const linkClassAttr = await linkElement!.getAttribute('class');
    console.log('link classAttr', linkClassAttr);
    expect(linkClassAttr).toBe('input1');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    
    // Test elements after selector change (should be healed)
    const healedTestClassElement = await page.$('input.test_class');
    expect(healedTestClassElement).not.toBeNull();
    await healedTestClassElement!.press('Enter');

    const healedTestTagElement = await page.$('test_tag#change_element');
    expect(healedTestTagElement).not.toBeNull();
    const healedClassAttr = await healedTestTagElement!.getAttribute('class');
    console.log('healedClassAttr', healedClassAttr);
    expect(healedClassAttr).toBe(classAttr);
    await healedTestTagElement!.isVisible();

    const healedChangeNameElement = await page.$('input[name="change_name"]');
    expect(healedChangeNameElement).not.toBeNull();
    await healedChangeNameElement!.press('Enter');

    const healedLinkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
    expect(healedLinkElement).not.toBeNull();
    await healedLinkElement!.isVisible();
    const healedLinkClassAttr = await healedLinkElement!.getAttribute('class');
    console.log('healed link classAttr', healedLinkClassAttr);
    expect(healedLinkClassAttr).toBe(linkClassAttr);
  });

  test('Checkbox verify with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find checkboxes before selector change
    const checkbox1 = await page.$('input.input1#form_checked1');
    expect(checkbox1).not.toBeNull();
    const checkbox2 = await page.$('input.input1#form_checked2');
    expect(checkbox2).not.toBeNull();
    const checkbox3 = await page.$('input.input1#form_checked3');
    expect(checkbox3).not.toBeNull();

    // Click Submit checkbox button
    const submitCheckboxBtn = await page.$('#Submit_checkbox');
    expect(submitCheckboxBtn).not.toBeNull();
    await submitCheckboxBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env-3.html', content, 'utf-8');

    // Find checkboxes after selector change (should be healed)
    const healedCheckbox1 = await page.$('input.input1#form_checked1');
    expect(healedCheckbox1).not.toBeNull();
    const healedCheckbox2 = await page.$('input.input1#form_checked2');
    expect(healedCheckbox2).not.toBeNull();
    const healedCheckbox3 = await page.$('input.input1#form_checked3');
    expect(healedCheckbox3).not.toBeNull();
  });

  test('Input field enable to disable with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find element before selector change (should be enabled)
    const enabledElement = await page.$('#change_enabled');
    expect(enabledElement).not.toBeNull();
    expect(await enabledElement!.isEnabled()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element after selector change (should be healed and now disabled)
    const disabledElement = await page.$('#change_enabled');
    expect(disabledElement).not.toBeNull();
    expect(await disabledElement!.isDisabled()).toBe(true);
  });

  test('Checkbox checked to unchecked with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find checkbox before selector change (should be checked)
    const checkedElement = await page.$('#change_checked');
    expect(checkedElement).not.toBeNull();
    expect(await checkedElement!.isChecked()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find checkbox after selector change (should be healed and now unchecked)
    const uncheckedElement = await page.$('#change_checked');
    expect(uncheckedElement).not.toBeNull();
    expect(await uncheckedElement!.isChecked()).toBe(false);
  });
});

