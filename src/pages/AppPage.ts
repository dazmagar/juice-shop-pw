import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { RegistrationComponent } from '@components/Registration';
import { LoginComponent } from '@components/Login';
import { NavBarComponent } from '@components/NavBar';
import { SearchComponent } from '@components/SearchResult';
import { BasketComponent } from '@components/Basket';
import { AddressSelectComponent } from '@components/AddressSelect';
import { AddressCreateComponent } from '@components/AddressCreate';
import { DeliveryAddressComponent } from '@components/DeliveryAddress';
import { PaymentComponent } from '@components/Payment';
import { PaymentMethodComponent } from '@components/PaymentMethod';
import { OrderSummaryComponent } from '@components/OrderSummary';
import { OrderCompletionComponent } from '@components/OrderCompletion';

export class AppPage {
    public readonly page: Page;
    public readonly registration: RegistrationComponent;
    public readonly login: LoginComponent;
    public readonly navBar: NavBarComponent;
    public readonly searchResult: SearchComponent;
    public readonly basket: BasketComponent;
    public readonly addressSelect: AddressSelectComponent;
    public readonly addressCreate: AddressCreateComponent;
    public readonly deliveryAddress: DeliveryAddressComponent;
    public readonly paymentMethod: PaymentMethodComponent;
    public readonly payment: PaymentComponent;
    public readonly orderSummary: OrderSummaryComponent;
    public readonly orderCompletion: OrderCompletionComponent;
    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBarComponent(page);
        this.searchResult = new SearchComponent(page);
        this.login = new LoginComponent(page);
        this.registration = new RegistrationComponent(page);
        this.basket = new BasketComponent(page);
        this.addressCreate = new AddressCreateComponent(page);
        this.addressSelect = new AddressSelectComponent(page, this.addressCreate);
        this.deliveryAddress = new DeliveryAddressComponent(page);
        this.paymentMethod = new PaymentMethodComponent(page);
        this.payment = new PaymentComponent(page, this.paymentMethod);
        this.orderSummary = new OrderSummaryComponent(page);
        this.orderCompletion = new OrderCompletionComponent(page);
    }

    async open(): Promise<void> {
        await allure.step('Open app main page', async () => {
            await this.page.goto('/');
        });
    }
}
