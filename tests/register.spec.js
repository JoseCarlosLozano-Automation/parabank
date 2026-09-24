import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { RegisterPage } from '../pages/RegisterPage.js';

const credentialsPath = path.resolve(process.cwd(), 'test-data/generated-user.json');

test.describe('User registration flow', () => {
  test('register a new user successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const uniquePart = `${Date.now().toString().slice(-5)}_${faker.string.alphanumeric(3).toLowerCase()}`;

    const password = 'Password123!';
    const username = `user_${uniquePart}`;
    const userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode('#####'),
      phone: faker.phone.number('##########'),
      ssn: faker.string.numeric(9),
      username,
      password,
      confirmPassword: password,
    };

    console.log('Generated username:', userData.username);
    console.log('Generated password:', userData.password);

    await fs.mkdir(path.dirname(credentialsPath), { recursive: true });
    await fs.writeFile(credentialsPath, JSON.stringify({ username: userData.username, password: userData.password }, null, 2));

    await registerPage.goToRegistrationPage();
    await registerPage.fillForm(userData);
    await registerPage.submit();

    await expect(page).toHaveURL(/register\.htm/);
    await expect(page.getByText(`Welcome ${username}`)).toBeVisible();  
    });
});
