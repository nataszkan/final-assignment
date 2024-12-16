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

test.describe('Store Purchase Edge Cases', () => {
    test('Attempt to purchase with invalid quantity (0 or negative)', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.goToPage();
    
        await page.selectOption('#select-product', '5');
        await page.fill('#buyAmount', '0');
        await page.click('#button-buy-product');
        
        const errorMessage = await page.locator('#message');
        await expect(errorMessage).toContainText('0 amount');
    
        await page.fill('#buyAmount', '-4');
        await page.click('#button-buy-product');
        await expect(errorMessage).toContainText('higher than 0');
    });

    test('Attempt to purchase with empty quantity or product selection', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.goToPage();
    
        await page.selectOption('#select-product', '5');
        await page.fill('#buyAmount', '');
        await page.click('#button-buy-product');
        
        const errorMessage = await page.locator('#message');
        await expect(errorMessage).toContainText('Quantity is required');

        await page.selectOption('#select-product', '');
        await page.fill('#quantity-input', '3');
        await page.click('#button-buy-product');
        
        await expect(errorMessage).toContainText('Please select a product!');
    });
});