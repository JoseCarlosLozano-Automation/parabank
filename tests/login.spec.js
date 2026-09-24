import { test, expect } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const credentialsPath = path.resolve(process.cwd(), 'test-data/generated-user.json');
const FALLBACK_CREDENTIALS = {
  username: 'john',
  password: 'demo',
};

async function getCredentials() {
  try {
    const raw = await fs.readFile(credentialsPath, 'utf8');
    const credentials = JSON.parse(raw);
    if (credentials?.username && credentials?.password) {
      return credentials;
    }
  } catch (error) {
    // no file yet; using fallback credentials below
  }

  return FALLBACK_CREDENTIALS;
}

test.describe('Login functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/parabank/index.htm');
  });

  test('user can login with valid credentials', async ({ page }) => {
    const credentials = await getCredentials();

    await page.locator('input[name="username"]').fill(credentials.username);
    await page.locator('input[name="password"]').fill(credentials.password);
    await page.locator('input[value="Log In"]').click();

    await expect(page).toHaveURL(/overview\.htm/);
    await expect(page.getByText(/Welcome/i)).toBeVisible();
  });

  test('user cannot login with invalid credentials', async ({ page }) => {
    await page.locator('input[name="username"]').fill('wronguser');
    await page.locator('input[name="password"]').fill('wrongpass');
    await page.locator('input[value="Log In"]').click();

    await expect(page.getByText(/The username and password could not be verified/i)).toBeVisible();
  });

  test('validation is displayed for empty fields', async ({ page }) => {
    await page.locator('input[value="Log In"]').click();

  await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
  await expect(page.getByText('Please enter a username and password.')).toBeVisible();
  });
});
