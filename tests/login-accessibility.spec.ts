import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AccessibilityHelper } from '../utils/accessibilityHelper';

test.describe('Login Page Accessibility Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToPage();
    });

    test('Login page has no accessibility violations', async ({ page }) => {
        const results = await AccessibilityHelper.runA11yTest(page);
        expect(results.violations).toHaveLength(0);
    });
});