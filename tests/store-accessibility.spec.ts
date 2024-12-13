import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/store-page';
import { AccessibilityHelper } from '../utils/accessibilityHelper';

test.describe('Store Page Accessibility Tests', () => {
    let storePage: StorePage;

    test.beforeEach(async ({ page }) => {
        storePage = new StorePage(page);
        await storePage.goToPage();
    });

    test('Store page has no accessibility violations', async ({ page }) => {
        const results = await AccessibilityHelper.runA11yTest(page);
        expect(results.violations).toHaveLength(0);
    });
});