import { test, expect } from '@playwright/test';
import { InsurancePage } from '../pages/insurance-page';


test.describe('Hoff Insurance Page Tests', () => {
    test('Verify page loads with correct heading', async ({ page }) => {
    const insurancePage = new InsurancePage(page);

    await insurancePage.goToPage();

    const heading = await insurancePage.getPageHeading();
      expect(heading).toContain('Insurance'); // Adjust based on actual heading text
    });
});