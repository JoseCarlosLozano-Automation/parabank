# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login functionality >> user cannot login with invalid credentials
- Location: tests\login.spec.js:42:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/The username and password could not be verified/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText(/The username and password could not be verified/i) with timeout 5000ms
  - waiting for getByText(/The username and password could not be verified/i)

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Error!" [level=1]
- paragraph: An internal error has occurred and has been logged.
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { promises as fs } from 'node:fs';
  3  | import path from 'node:path';
  4  | 
  5  | const credentialsPath = path.resolve(process.cwd(), 'test-data/generated-user.json');
  6  | const FALLBACK_CREDENTIALS = {
  7  |   username: 'john',
  8  |   password: 'demo',
  9  | };
  10 | 
  11 | async function getCredentials() {
  12 |   try {
  13 |     const raw = await fs.readFile(credentialsPath, 'utf8');
  14 |     const credentials = JSON.parse(raw);
  15 |     if (credentials?.username && credentials?.password) {
  16 |       return credentials;
  17 |     }
  18 |   } catch (error) {
  19 |     // no file yet; using fallback credentials below
  20 |   }
  21 | 
  22 |   return FALLBACK_CREDENTIALS;
  23 | }
  24 | 
  25 | test.describe('Login functionality', () => {
  26 | 
  27 |   test.beforeEach(async ({ page }) => {
  28 |     await page.goto('/parabank/index.htm');
  29 |   });
  30 | 
  31 |   test('user can login with valid credentials', async ({ page }) => {
  32 |     const credentials = await getCredentials();
  33 | 
  34 |     await page.locator('input[name="username"]').fill(credentials.username);
  35 |     await page.locator('input[name="password"]').fill(credentials.password);
  36 |     await page.locator('input[value="Log In"]').click();
  37 | 
  38 |     await expect(page).toHaveURL(/overview\.htm/);
  39 |     await expect(page.getByText(/Welcome/i)).toBeVisible();
  40 |   });
  41 | 
  42 |   test('user cannot login with invalid credentials', async ({ page }) => {
  43 |     await page.locator('input[name="username"]').fill('wronguser');
  44 |     await page.locator('input[name="password"]').fill('wrongpass');
  45 |     await page.locator('input[value="Log In"]').click();
  46 | 
> 47 |     await expect(page.getByText(/The username and password could not be verified/i)).toBeVisible();
     |                                                                                      ^ Error: expect(locator).toBeVisible() failed
  48 |   });
  49 | 
  50 |   test('validation is displayed for empty fields', async ({ page }) => {
  51 |     await page.locator('input[value="Log In"]').click();
  52 | 
  53 |   await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
  54 |   await expect(page.getByText('Please enter a username and password.')).toBeVisible();
  55 |   });
  56 | });
  57 | 
```