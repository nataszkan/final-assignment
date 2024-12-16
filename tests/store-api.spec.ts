import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'https://hoff.is/store2/api/v1/';

async function logRequestAndResponse(apiContext, endpoint) {
    console.log('Making request to URL:', baseURL + endpoint);
    const response = await apiContext.get(endpoint);

    if (!response.ok()) {
        console.error(`Request failed with status ${response.status()} for endpoint: ${endpoint}`);
        throw new Error(`Failed request: ${response.status()}`);
    }

    const body = await response.json();
    console.log('Response Body:', body);
    return { response, body };
}

test.describe('API tests for Store', () => {
    let apiContext;

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
        
        try {
            const { response, body } = await logRequestAndResponse(apiContext, endpoint);

            expect(response.ok()).toBeTruthy();
            expect(body).toHaveProperty('products');
            expect(body.products.length).toBeGreaterThan(0);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            throw error;
        }
    });

    test.describe('Fetch details for specific products', () => {
        const productIds = [1, 3, 8];

        for (const productId of productIds) {
            test(`Fetch details for product with ID ${productId}`, async () => {
                const endpoint = `price/${productId}`;

                try {
                    const { response, body } = await logRequestAndResponse(apiContext, endpoint);

                    expect(response.ok()).toBeTruthy();
                    expect(body).toHaveProperty('id', productId);
                    expect(body).toHaveProperty('name');
                } catch (error) {
                    console.error(`Error fetching details for product ${productId}:`, error.message);
                    throw error;
                }
            });
        }
    });
});
