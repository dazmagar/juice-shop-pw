import { type Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class BasketComponent extends BaseComponent {
    private readonly selectors = {
        basketLink: 'button[routerlink="/basket"]',
        basketRoot: 'app-basket',
        totalPrice: '#price',
        checkoutButton: '#checkoutButton',
    };

    constructor(page: Page) {
        super(page, 'app-root');
    }

    async open(): Promise<void> {
        await allure.step('Open basket', async () => {
            await this.page.locator(this.selectors.basketLink).click();
            await expect(this.page).toHaveURL(/\/basket/);
            await expect(this.page.locator(this.selectors.basketRoot)).toBeVisible();
        });
    }

    async verifyTotalPrice(): Promise<void> {
        await allure.step('Verify total price based on items in the basket', async () => {
            // eslint-disable-next-line playwright/no-wait-for-timeout
            await this.page.waitForTimeout(500);
            const rows = await this.page.locator('mat-row').all();
            let calculatedTotal = 0;
            for (const row of rows) {
                const quantityText = await row.locator('.cdk-column-quantity > span').innerText();
                const priceText = await row.locator('.cdk-column-price').innerText();
                const quantity = parseInt(quantityText.trim(), 10);
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                calculatedTotal += quantity * price;
            }
            const totalText = await this.page.locator(this.selectors.totalPrice).innerText();
            const displayedTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));
            expect(calculatedTotal).toBe(displayedTotal);
        });
    }

    async proceedToCheckout(): Promise<void> {
        await allure.step(
            'Proceed to checkout and verify address selection component',
            async () => {
                await this.click(this.selectors.checkoutButton);
                await expect(this.page).toHaveURL(/#\/address\/select/);
                await expect(this.page.locator('app-address-select')).toBeVisible();
            },
        );
    }
}
