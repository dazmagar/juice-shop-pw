import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';
import { NavBarComponent } from './NavBar';

export class SearchComponent extends BaseComponent {
    private readonly selectors = {
        itemName: '.item-name',
        addButton: '.basket-btn-container button',
    };

    private navBar: NavBarComponent;

    constructor(page: Page) {
        super(page, 'app-search-result');
        this.navBar = new NavBarComponent(page);
    }

    async addToBasket(productName: string): Promise<void> {
        await allure.step(`Add product "${productName}" to basket`, async () => {
            await this.navBar.openSearch();
            await this.navBar.submitSearch(productName);
            const productLocator = this.root
                .locator(this.selectors.itemName, { hasText: productName })
                .first();
            const tile = productLocator.locator('xpath=ancestor::mat-grid-tile');
            await tile.locator(this.selectors.addButton).click();
            await this.page.waitForTimeout(500);
            await this.navBar.clearSearch();
            await this.navBar.closeSearch();
        });
    }
}
