import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/store-page';

const PRODUCT_NAME = 'Cup of Coffee';
const QUANTITY = 8;

test.describe('Store Purchase Flow', () => {
    test('Make a purchase for a product', async ({ page }) => {
        const storePage = new StorePage(page);
    
        await storePage.goToPage();
        expect(await storePage.getPageHeading()).toContain('Store');
    
        await storePage.selectProduct(PRODUCT_NAME);
        await storePage.enterQuantity(QUANTITY);
        await storePage.clickBuyButton();
    
        const confirmationMessage = page.locator('#message');
        await expect(confirmationMessage).toContainText('You bought');
        await expect(confirmationMessage).toContainText(PRODUCT_NAME);
    });
});