import { test, expect } from '@playwright/test';

test.describe('API tests for Store', () => {
    let apiContext;
    const baseURL = 'https://hoff.is/store2/api/v1/'; // Ensure trailing slash

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL,
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('Fetch list of all products', async () => {
        const endpoint = 'product/list';
        console.log('Making request to URL:', baseURL + endpoint);

        const response = await apiContext.get(endpoint);
        console.log('Status Code:', response.status());

        const body = await response.json();
        console.log('Response Body:', body);

        expect(response.ok()).toBeTruthy();
    });

    test('Fetch details of a single product by ID', async () => {
        const productId = 5;
        const endpoint = `price/${productId}`;
        console.log('Making request to URL:', baseURL + endpoint);

        const response = await apiContext.get(endpoint);
        console.log('Status Code:', response.status());

        const body = await response.json();
        console.log('Response Body:', body);
        
        expect(response.ok()).toBeTruthy();
    });
});