import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';

export class AccessibilityHelper {
    static async runA11yTest(page: Page) {
        const results = await new AxeBuilder({ page }).analyze();

        if (results.violations.length > 0) {
            console.log(`❌ Accessibility Violations Found: ${results.violations.length}`);
            results.violations.forEach((violation, index) => {
                console.log(`\nViolation #${index + 1}`);
                console.log(`Description: ${violation.description}`);
                console.log(`Impact: ${violation.impact}`);
                console.log(`Affected Nodes:`);
                violation.nodes.forEach((node, nodeIndex) => {
                    console.log(`  ${nodeIndex + 1}: ${node.html}`);
                });
            });
        } else {
            console.log('✅ No Accessibility Violations Found.');
        }

        return results;
    }
}