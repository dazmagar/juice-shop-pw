import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';
import { AddressCreateComponent } from './AddressCreate';

export class AddressSelectComponent extends BaseComponent {
    private readonly selectors = {
        addressSelect: 'app-address-select',
        addNewAddressButton: '.btn-new-address',
        addressRow: 'mat-row',
        selectAddressRadio: 'mat-radio-button input[type="radio"]',
        continueButton: '.btn-next',
    };

    private readonly addressCreate: AddressCreateComponent;

    constructor(page: Page, addressCreate: AddressCreateComponent) {
        super(page, 'app-address-select');
        this.addressCreate = addressCreate;
    }

    async waitForAddressSelectVisible(): Promise<void> {
        await allure.step('Wait for address selection to be visible', async () => {
            await this.page
                .locator(this.selectors.addressSelect)
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async verifyAndAddAddress(): Promise<void> {
        await allure.step('Verify address presence and add if not present', async () => {
            const addressRows = await this.page.locator(this.selectors.addressRow).count();
            if (addressRows > 0) {
                await this.page.locator(this.selectors.selectAddressRadio).first().click();
            } else {
                await this.click(this.selectors.addNewAddressButton);
                await this.addressCreate.fillAddressForm();
                await this.page.locator(this.selectors.selectAddressRadio).last().click();
            }
        });
    }

    async continueToDelivery(): Promise<void> {
        await allure.step('Continue to delivery selection', async () => {
            await this.page.locator(this.selectors.continueButton).click();
        });
    }
}
