import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/store-page';


test.describe('Hoff Store Page Tests', () => {
    test('Verify page loads with correct heading', async ({ page }) => {
    const storePage = new StorePage(page);

    await storePage.goToPage();

    const heading = await storePage.getPageHeading();
    expect(heading).toContain('Store');
    });
});