import { createHtmlReport } from 'axe-html-reporter';

export async function generateA11yReport(results: any, reportFilePath: string) {
    if (results.violations.length > 0) {
        await createHtmlReport({
            results,
            options: {
                outputDir: 'a11y-reports', // Directory for reports
                reportFileName: reportFilePath,
            },
        });
        console.log(`Accessibility report generated: ${reportFilePath}`);
    } else {
        console.log('No accessibility violations found. Report not generated.');
    }
}