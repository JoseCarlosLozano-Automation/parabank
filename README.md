# Playwright Automation Project

This project is a Playwright-based automation framework for testing the ParaBank demo website.

## Overview

The framework currently includes:
- Playwright configuration with project-level settings
- Basic login test coverage
- User registration flow automation
- Faker-based random data generation
- Page Object Model (POM) structure for better test organization
- Persistence of generated credentials in a JSON file to reuse them between tests

## Project structure

- `playwright.config.js` - Playwright global configuration
- `tests/` - automated test files
  - `register.spec.js` - registration flow test
  - `login.spec.js` - login flow tests
- `pages/` - page object classes
  - `RegisterPage.js` - registration page interactions
- `test-data/` - generated runtime data
  - `generated-user.json` - stores the username and password created during registration
- `node_modules/` - installed dependencies

## Technologies used

- Playwright
- @playwright/test
- @faker-js/faker
- JavaScript (ES modules)

## Current testing scope

The framework includes:
- Registering a new user with generated random values
- Saving generated credentials for reuse
- Login happy path with valid credentials
- Login negative scenario with invalid credentials
- Login validation scenario for empty fields

## How to run tests

Run the registration test first:

```bash
npx playwright test tests/register.spec.js
```

Then run the login tests:

```bash
npx playwright test tests/login.spec.js
```

Or run the full tests folder sequentially:

```bash
npx playwright test tests/register.spec.js && npx playwright test tests/login.spec.js
```

## Notes

This project uses the public ParaBank application as the testing target. Because it is a shared demo environment, username uniqueness and session state may affect repeated runs. The tests are designed to generate unique values and reuse credentials between tests when possible.
