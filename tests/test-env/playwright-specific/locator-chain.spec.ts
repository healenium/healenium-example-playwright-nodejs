import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

// Playwright best practices: use locators, chain to narrow down, prefer user-facing attributes.
// See https://playwright.dev/docs/best-practices and https://playwright.dev/docs/locators
// Each test: use a chained locator → action → click button that changes DOM → same chain again (healing).

test.describe('Locator API - Chained Locators (healing) - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  // ----- Simple chain: parent locator + one child locator (single element) -----
  // Form-scoped getByPlaceholder: #main_form has one input with placeholder "Change: TestId".
  // After #Submit: placeholder → "Placeholder changed", data-testid → "new_validate_testId" (button-changes.md).
  test('simple chain - form then getByPlaceholder', async ({ page }) => {
    test.slow();

    const input = page.locator('#main_form').getByPlaceholder('Change: TestId');
    await input.fill('chained', { timeout: TIMEOUT });
    //await expect(input).toHaveValue('chained');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('#main_form').getByPlaceholder('Change: TestId');
    await healedInput.fill('chained healed', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('chained healed');
  });


  // Simple chain: main form then textbox by accessible name (aria-labelledby → "Field labeled by").
  // After #Submit: input class → "newClass", aria-labelledby → "new_change_className_label".
  test('simple chain - form then getByRole textbox', async ({ page }) => {
    test.slow();

    const input = page.locator('#main_form').getByRole('textbox', { name: 'Field labeled by' });
    await input.fill('role and label', { timeout: TIMEOUT });
    await expect(input).toHaveValue('role and label');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('#main_form').getByRole('textbox', { name: 'Field labeled by' });
    await healedInput.fill('role and label after heal', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('role and label after heal');
  });

  // ----- Chain with "and" (same element matches two locators) -----
  // Playwright: locator.and(other) — both must match. Single element: same input by placeholder and by title.
  // #validate_testId: placeholder "Change: TestId", title "Validate change test id". After #Submit: both change (button-changes.md).
  test('chain with and - getByPlaceholder and getByTitle', async ({ page }) => {
    test.slow();

    const input = page
      .getByPlaceholder('Change: TestId')
      .and(page.getByTitle('Validate change test id'));
    await input.fill('and chain', { timeout: TIMEOUT });
    await expect(input).toHaveValue('and chain');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page
      .getByPlaceholder('Change: TestId')
      .and(page.getByTitle('Validate change test id'));
    await healedInput.fill('and chain healed', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('and chain healed');
  });

  // Chain with filter (and-like): narrow by container then by text. Single draggable "Green Item".
  // After #Submit: innerText → "Changed: get by text" (button-changes.md).
  test('chain with filter - drag container then hasText', async ({ page }) => {
    test.slow();

    const greenItem = page.locator('.drag-container').filter({ hasText: 'Green Item' });
    await expect(greenItem).toBeVisible({ timeout: TIMEOUT });
    await expect(greenItem).toHaveCount(1);

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedGreenItem = page.locator('.drag-container').filter({ hasText: 'Green Item' });
    await expect(healedGreenItem).toBeVisible({ timeout: TIMEOUT });
    await expect(healedGreenItem).toHaveCount(1);
  });

  // ----- Chain with "or" (two ways to find the same element) -----
  // Playwright: locator1.or(locator2). Single element: #validate_testId by testid or by placeholder.
  // After #Submit: data-testid → "new_validate_testId", placeholder → "Placeholder changed".
  test('chain with or - getByTestId or getByPlaceholder', async ({ page }) => {
    test.slow();

    const input = page
      .getByTestId('change_testId')
      .or(page.getByPlaceholder('Change: TestId'));
    await input.fill('or chain', { timeout: TIMEOUT });
    await expect(input).toHaveValue('or chain');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page
      .getByTestId('change_testId')
      .or(page.getByPlaceholder('Change: TestId'));
    await healedInput.fill('or chain healed', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('or chain healed');
  });

  // Or: same element by getByTitle or getByTestId (#validate_testId).
  test('chain with or - getByTitle or getByTestId', async ({ page }) => {
    test.slow();

    const input = page
      .getByTitle('Validate change test id')
      .or(page.getByTestId('change_testId'));
    await expect(input).toBeVisible({ timeout: TIMEOUT });
    await input.fill('or title testid', { timeout: TIMEOUT });

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page
      .getByTitle('Validate change test id')
      .or(page.getByTestId('change_testId'));
    await expect(healedInput).toHaveValue('or title testid', { timeout: TIMEOUT });
  });

});
