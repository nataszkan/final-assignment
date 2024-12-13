import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/store-page';

test.describe('Purchase Flow', () => {
    let storePage: StorePage;

    test.beforeEach(async ({ page }) => {
        storePage = new StorePage(page);
        await storePage.goToPage();
    });
});