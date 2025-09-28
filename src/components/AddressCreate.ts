import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class AddressCreateComponent extends BaseComponent {
    private readonly selectors = {
        addressCreateForm: 'app-address-create',
        submitButton: '#submitButton',
        countryInput: 'input[placeholder="Please provide a country."]',
        nameInput: 'input[placeholder="Please provide a name."]',
        mobileInput: 'input[placeholder="Please provide a mobile number."]',
        zipInput: 'input[placeholder="Please provide a ZIP code."]',
        addressInput: 'textarea[placeholder="Please provide an address."]',
        cityInput: 'input[placeholder="Please provide a city."]',
        stateInput: 'input[placeholder="Please provide a state."]',
    };

    constructor(page: Page) {
        super(page, 'app-address-create');
    }

    async fillAddressForm(): Promise<void> {
        await allure.step('Fill address form and submit', async () => {
            await this.waitForVisible();
            await this.fill(this.selectors.countryInput, process.env.USER_COUNTRY ?? '');
            await this.fill(this.selectors.nameInput, process.env.USER_NAME ?? '');
            await this.fill(this.selectors.mobileInput, process.env.USER_MOBILE ?? '');
            await this.fill(this.selectors.zipInput, process.env.USER_ZIP ?? '');
            await this.fill(this.selectors.addressInput, process.env.USER_ADDRESS ?? '');
            await this.fill(this.selectors.cityInput, process.env.USER_CITY ?? '');
            await this.fill(this.selectors.stateInput, process.env.USER_STATE ?? '');
            await this.click(this.selectors.submitButton);
        });
    }
}
