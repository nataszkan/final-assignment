import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityHelper {
    static async runA11yTest(page: Page) {
        const results = await new AxeBuilder({ page }).analyze();
        return results;
    }
}