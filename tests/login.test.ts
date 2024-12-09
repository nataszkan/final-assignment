import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


test.describe('Hoff Insurance Login Page Tests', () => {
    test('Verify page loads with correct heading', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToPage();

    const heading = await loginPage.getPageHeading();
    expect(heading).toContain('Login');
    });
});