import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseComponent } from './Base';
import { PaymentMethodComponent } from './PaymentMethod';

export class PaymentComponent extends BaseComponent {
    private readonly selectors = {
        walletBalance: 'text=Wallet Balance',
        payButton: 'button:has-text("Pay")',
        addCardButton: 'span:has-text("Add new card")',
        cardRadio: 'mat-radio-button input[type="radio"]',
        proceedToReviewButton: '[aria-label="Proceed to review"]',
    };

    private paymentMethod: PaymentMethodComponent;

    constructor(page: Page, paymentMethod: PaymentMethodComponent) {
        super(page, 'app-payment-method');
        this.paymentMethod = paymentMethod;
    }

    async pay(): Promise<void> {
        await allure.step('Pay for order', async () => {
            const balanceText = await this.page
                .locator(this.selectors.walletBalance)
                .first()
                .textContent();
            const payButton = this.page.locator(this.selectors.payButton);
            const payButtonText = await payButton.textContent();
            const amountMatch = payButtonText?.match(/Pay ([\d.,]+)/);
            const amount = amountMatch ? parseFloat(amountMatch[1].replace(',', '.')) : 0;
            const balance = balanceText ? parseFloat(balanceText.replace(/[^\d.]/g, '')) : 0;
            if (balance >= amount && !(await payButton.isDisabled())) {
                await payButton.click();
                return;
            }
            const cardExists = (await this.page.locator(this.selectors.cardRadio).count()) > 0;
            if (!cardExists) {
                await this.page.locator(this.selectors.addCardButton).click();
                await this.paymentMethod.addCard();
            }
            await this.page.locator(this.selectors.cardRadio).first().click();
        });
    }

    async continueToReview(): Promise<void> {
        await allure.step('Continue to order summary', async () => {
            await this.page.locator(this.selectors.proceedToReviewButton).first().click();
        });
    }

    async waitForPaymentVisible(): Promise<void> {
        await allure.step('Wait for payment page to be visible', async () => {
            await this.page.locator('h1:has-text("My Payment Options")').waitFor({ state: 'visible', timeout: 5000 });
        });
    }
}
