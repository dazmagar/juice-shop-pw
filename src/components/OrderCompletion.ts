import { type Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class OrderCompletionComponent extends BaseComponent {
    private readonly selectors = {
        thankYouHeading: 'h1:has-text("Thank you for your purchase!")',
    };

    constructor(page: Page) {
        super(page, 'app-order-completion');
    }

    async verifyThankYou(): Promise<void> {
        await allure.step('Verify order completion message', async () => {
            await expect(this.page.locator(this.selectors.thankYouHeading)).toBeVisible();
        });
    }

    async waitForOrderCompletionVisible(): Promise<void> {
        await allure.step('Wait for order completion page to be visible', async () => {
            await this.page
                .locator(this.selectors.thankYouHeading)
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }
}
