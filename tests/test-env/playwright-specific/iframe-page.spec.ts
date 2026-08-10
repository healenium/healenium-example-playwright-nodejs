import { test } from '@playwright/test';
import { gotoTestEnv, TEST_ENV_URL } from '../../../helpers/goto';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - iframe - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTestEnv(page, TEST_ENV_URL);
  });

  test('iframe - change frame title - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement!.contentFrame();
    const inputField = await iframe!.$('#iframe_input');
    await inputField!.click({ timeout: TIMEOUT });

    // Click Change locators button 
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedIframeElement = await page.$('iframe[title="Iframe Example"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    const healedIframe = await healedIframeElement!.contentFrame();
    const healedInputField = await healedIframe!.$('#iframe_input');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedInputField!.click({ timeout: TIMEOUT });
  });

  test('iframe - change input field - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement!.contentFrame();
    const inputField = await iframe!.$('#iframe_input');
    await inputField!.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe!.$('#iframe_Submit');
    await iframeSubmitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = await iframe!.$('#iframe_input');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedInputField!.click({ timeout: TIMEOUT });
  });

  test('iframe - change frame title & input field - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement!.contentFrame();
    const inputField = await iframe!.$('#iframe_input');
    await inputField!.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe!.$('#iframe_Submit');
    await iframeSubmitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    // Click Change locators button 
    const submitBtn = await page.$('#Submit');
    await submitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedIframeElement = await page.$('iframe[title="Iframe Example"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    const healedIframe = await healedIframeElement!.contentFrame();
    const healedInputField = await healedIframe!.$('#iframe_input');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedInputField!.click({ timeout: TIMEOUT });
  });

  test('iframe - change nested frame - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement!.contentFrame();
    const nestedFrameElement = await iframe!.$('iframe[title="Nested iframe Example"]');
    const nestedFrame = await nestedFrameElement!.contentFrame();
    const inputField = await nestedFrame!.$('#iframe_2_input');
    await inputField!.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe!.$('#iframe_Submit');
    await iframeSubmitBtn!.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing nested frame after locator change
    const healedNestedFrameElement = await iframe!.$('iframe[title="Iframe Example"]');
    await page.waitForTimeout(WAIT_TIMEOUT);
    const healedNestedFrame = await healedNestedFrameElement!.contentFrame();

    // Test healing nested frame element after locator change
    const healedInputField = await healedNestedFrame!.$('#iframe_2_input');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedInputField!.click({ timeout: TIMEOUT });
  });

});
