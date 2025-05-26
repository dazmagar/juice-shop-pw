import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class PaymentMethodComponent extends BaseComponent {
    private readonly selectors = {
        nameInput: 'input[formcontrolname="owner"]',
        cardNumberInput: 'input[formcontrolname="cardNumber"]',
        expiryMonthSelect: 'select[formcontrolname="expiryMonth"]',
        expiryYearSelect: 'select[formcontrolname="expiryYear"]',
        submitButton: 'button:has-text("Submit")',
    };

    constructor(page: Page) {
        super(page, 'app-add-payment-method, app-payment-method, form');
    }

    async addCard(): Promise<void> {
        await allure.step('Add new credit/debit card', async () => {
            const name = process.env.USER_NAME ?? 'Tester1';
            const cardNumber = process.env.USER_CARD_NUMBER ?? '4242424242424242';
            const expiration = process.env.USER_CARD_EXPIRATION_DATE ?? '1/2080';
            const [month, year] = expiration.split('/');

            await this.page.locator(this.selectors.nameInput).fill(name);
            await this.page.locator(this.selectors.cardNumberInput).fill(cardNumber);
            await this.page.locator(this.selectors.expiryMonthSelect).selectOption(month);
            await this.page.locator(this.selectors.expiryYearSelect).selectOption(year);
            await this.page.locator(this.selectors.submitButton).click();
        });
    }
}
