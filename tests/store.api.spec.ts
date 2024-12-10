import { test, expect, request } from '@playwright/test';

test.describe('Api tests for Store', () => {
    let apiContext;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL: 'https://hoff.is/store2/api/v1',
        })
    })


    

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('Fetch list of all products', async () => {
        const url = `https://hoff.is/store2/api/v1/product/list`;  // Complete URL
        console.log('Making request to URL:', url);  // Log the full URL
        
        const response = await apiContext.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    
        console.log('Status Code:', response.status());
        const body = await response.text();
        console.log('Response Body:', body);
    
        expect(response.ok()).toBeTruthy();
    });

    test('Fetch details of a single product', async () => {
        const productId = 1;
        const url = `https://hoff.is/store2/api/v1/price/${productId}`;  // Full URL
        console.log('Making request to URL:', url);  // Log the full URL
    
        const response = await apiContext.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    
        console.log('Status Code:', response.status());
        const body = await response.text();
        console.log('Response Body:', body);
    
        expect(response.ok()).toBeTruthy();
    });
})