import { type Page } from '@playwright/test';
import { BaseComponent } from './Base';
import * as allure from 'allure-js-commons';

export type DeliveryOption = 'One Day Delivery' | 'Fast Delivery' | 'Standard Delivery';

export class DeliveryAddressComponent extends BaseComponent {
    private readonly selectors = {
        deliveryMethodPage: 'app-delivery-method',
        deliveryOptionRadio: 'mat-radio-button input[type="radio"]',
        oneDayDeliveryRow: 'mat-row:has-text("One Day Delivery")',
        fastDeliveryRow: 'mat-row:has-text("Fast Delivery")',
        standardDeliveryRow: 'mat-row:has-text("Standard Delivery")',
        continueButton: 'button.nextButton',
    };

    constructor(page: Page) {
        super(page, 'app-delivery-method');
    }

    async waitForDeliveryAddressVisible(): Promise<void> {
        await allure.step('Wait for delivery method selection to be visible', async () => {
            await this.page
                .locator(this.selectors.deliveryMethodPage)
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async selectDeliveryOption(option: DeliveryOption): Promise<void> {
        await allure.step(`Select delivery option: ${option}`, async () => {
            let rowSelector: string;
            switch (option) {
                case 'One Day Delivery':
                    rowSelector = this.selectors.oneDayDeliveryRow;
                    break;
                case 'Fast Delivery':
                    rowSelector = this.selectors.fastDeliveryRow;
                    break;
                case 'Standard Delivery':
                    rowSelector = this.selectors.standardDeliveryRow;
                    break;
                default:
                    throw new Error(`Unsupported delivery option: ${option}`);
            }
            await this.page.locator(`${rowSelector} ${this.selectors.deliveryOptionRadio}`).click();
        });
    }

    async continueToPayment(): Promise<void> {
        await allure.step('Continue to payment', async () => {
            await this.page.locator(this.selectors.continueButton).click();
        });
    }
}
