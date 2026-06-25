import { test, expect } from '@playwright/test';

/**
 * A small, fast smoke suite. Its job is to give the CI/CD pipeline something
 * real to execute and report on. The same workflow patterns scale to the
 * larger Playwright and API suites in the companion repositories.
 */
test.describe('Smoke', () => {
  test('home page loads with a login form', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('standard user can log in', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('invalid login is rejected', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('bad_user');
    await page.locator('#password').fill('bad_pass');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
