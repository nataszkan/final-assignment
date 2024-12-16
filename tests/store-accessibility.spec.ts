import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/store-page';
import { AccessibilityHelper } from '../utils/accessibility-helper';
import { generateA11yReport } from '../utils/axe-html-report-helper';

test.describe('Store Page Accessibility Tests', () => {
    let storePage: StorePage;

    test.beforeEach(async ({ page }) => {
        storePage = new StorePage(page);
        await storePage.goToPage();
    });

    test('Store page has no accessibility violations', async ({ page }) => {
        const results = await AccessibilityHelper.runA11yTest(page);

        await generateA11yReport(results, 'store-page-a11y-report.html');

        expect(results.violations).toHaveLength(0);
    });
});