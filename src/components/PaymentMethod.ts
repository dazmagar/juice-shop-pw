import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class PaymentMethodComponent extends BaseComponent {
    private readonly selectors = {
        nameInput: 'input[type="text"][matinput]',
        cardNumberInput: 'input[type="number"][matinput]',
        expiryMonthSelect: 'select[matnativecontrol]',
        expiryYearSelect: 'select[matnativecontrol]',
        submitButton: '#submitButton',
    };

    constructor(page: Page) {
        super(page, 'app-payment-method');
    }

    async addCard(): Promise<void> {
        await allure.step('Add new credit/debit card', async () => {
            const name = process.env.USER_NAME ?? '';
            const cardNumber = process.env.USER_CARD_NUMBER ?? '';
            const expiration = process.env.USER_CARD_EXPIRATION_DATE ?? '';
            const [month, year] = expiration.split('/');

            await this.fill(this.selectors.nameInput, name);
            await this.fill(this.selectors.cardNumberInput, cardNumber);
            await this.page.locator(this.selectors.expiryMonthSelect).first().selectOption(month);
            await this.page.locator(this.selectors.expiryYearSelect).last().selectOption(year);
            await this.click(this.selectors.submitButton);
        });
    }
}
