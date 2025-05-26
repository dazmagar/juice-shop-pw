import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class OrderSummaryComponent extends BaseComponent {
    private readonly selectors = {
        placeOrderButton: 'button:has-text("Place your order and pay")',
    };

    constructor(page: Page) {
        super(page, 'app-order-summary');
    }

    async placeOrderAndPay(): Promise<void> {
        await allure.step('Place order and pay', async () => {
            await this.page.locator(this.selectors.placeOrderButton).first().click();
        });
    }

    async waitForOrderSummaryVisible(): Promise<void> {
        await allure.step('Wait for order summary page to be visible', async () => {
            await this.page
                .locator('text=Order Summary')
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }
}
