import { Page } from "@playwright/test"

export class StorePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = 'https://hoff.is/store/';
    readonly headingSelector = 'h3';

    async goToPage() {
        await this.page.goto(this.url);
    }

    async getPageHeading() {
        return this.page.locator('h3', { hasText: 'Store' }).textContent();
    }
}