import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AccessibilityHelper } from '../utils/accessibility-helper';
import { generateA11yReport } from '../utils/axe-html-report-helper';

test.describe('Login Page Accessibility Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToPage();
    });

    test('Login page has no accessibility violations', async ({ page }) => {
        const results = await AccessibilityHelper.runA11yTest(page);

        await generateA11yReport(results, 'login-page-a11y-report.html');

        expect(results.violations).toHaveLength(0);
    });
});