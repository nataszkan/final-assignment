import { Page } from "@playwright/test"

export class StorePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly url = 'https://hoff.is/store2/';
    readonly headingSelector = 'h1';
    readonly productSelectSelector = '#select-product';
    readonly quantityInputSelector = '#buyAmount';
    readonly buyButtonSelector = '#button-buy-product';

    async goToPage() {
        await this.page.goto(this.url);
    }

    async getPageHeading() {
        return this.page.locator(this.headingSelector, { hasText: 'Store' }).textContent();
    }

    async selectProduct(product: string) {
        await this.page.selectOption(this.productSelectSelector, { label: product });
    }

    async enterQuantity(quantity: number) {
        await this.page.fill(this.quantityInputSelector, quantity.toString());
    }

    async clickBuyButton() {
        await this.page.click(this.buyButtonSelector);
    }
}