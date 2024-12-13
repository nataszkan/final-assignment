import { AxeBuilder } from '@axe-core/playwright';
import { Page } from '@playwright/test';

export class AccessibilityHelper {
    static async runA11yTest(page: Page) {
        const results = await new AxeBuilder({ page }).analyze();
        
        if (results.violations.length > 0) {
            console.log('Accessibility Violations:');
            results.violations.forEach((violation) => {
                console.log(`Violation: ${violation.id}`);
                console.log(`Description: ${violation.description}`);
                console.log(`Impact: ${violation.impact}`);
                violation.nodes.forEach((node, index) => {
                    console.log(`Node ${index + 1}: ${node.html}`);
                });
            });
        } else {
            console.log('No accessibility violations found.');
        }

        return results;
    }
}