import { Page } from "@playwright/test"

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = 'https://hoff.is/login/';
    readonly headingSelector = 'h2';

    async goToPage() {
        await this.page.goto(this.url);
    }

    async getPageHeading() {
        return this.page.locator(this.headingSelector).textContent();
    }
}