import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/store-page';

test.describe('Store Purchase Flow', () => {
    test('Make a purchase for a product', async ({ page }) => {
        const storePage = new StorePage(page);

        await storePage.goToPage();
        expect(await storePage.getPageHeading()).toContain('Store');

        await storePage.selectProduct('Cup of Coffee');

        await storePage.enterQuantity(5);

        await storePage.clickBuyButton();

        const confirmationMessage = await page.locator('#message')
        await expect(confirmationMessage).toContainText('You bought');
        await expect(confirmationMessage).toContainText('Cup of Coffee');
    });
});