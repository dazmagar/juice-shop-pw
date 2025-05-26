import { type Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';

export class NavBarComponent extends BaseComponent {
    private readonly selectors = {
        accountButton: '#navbarAccount',
        loginMenuItem: '#navbarLoginButton',
        searchIcon: '.mat-search_icon-search',
        searchCloseIcon: '.mat-search_icon-close',
        searchInput: 'app-mat-search-bar input',
        homeButton: '#homeButton',
        basketCount: 'button[routerlink="/basket"] .fa-layers-counter',
        basketLink: 'button[routerlink="/basket"]',
        logoutButton: '#navbarLogoutButton',
    };

    constructor(page: Page) {
        super(page, 'app-navbar');
    }

    async goHome(): Promise<void> {
        await allure.step('Click home button and verify search result visibility', async () => {
            await this.page.locator(this.selectors.homeButton).click();
            await this.page
                .locator('app-search-result')
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async openSearch(): Promise<void> {
        await allure.step('Open search bar', async () => {
            await this.root.locator(this.selectors.searchIcon).click();
            await this.root
                .locator(this.selectors.searchInput)
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async enterSearchTerm(term: string): Promise<void> {
        await allure.step(`Enter search term: ${term}`, async () => {
            await this.fill(this.selectors.searchInput, term);
        });
    }

    async submitSearch(term: string): Promise<void> {
        await allure.step(`Submit search for term: ${term}`, async () => {
            await this.enterSearchTerm(term);
            await this.root.locator(this.selectors.searchInput).press('Enter');
            // eslint-disable-next-line playwright/no-wait-for-timeout
            await this.page.waitForTimeout(500);
        });
    }

    async clearSearch(): Promise<void> {
        await allure.step('Clear search input and press Enter', async () => {
            await this.enterSearchTerm('');
            await this.root.locator(this.selectors.searchInput).press('Enter');
            // eslint-disable-next-line playwright/no-wait-for-timeout
            await this.page.waitForTimeout(500);
        });
    }

    async closeSearch(): Promise<void> {
        await allure.step('Close search bar', async () => {
            await this.root.locator(this.selectors.searchCloseIcon).click();
            await this.root
                .locator(this.selectors.searchInput)
                .waitFor({ state: 'hidden', timeout: 5000 });
            await expect(this.root.locator('.mat-search_icons')).not.toHaveClass(/--active/);
        });
    }

    async openAccountMenu(): Promise<void> {
        await allure.step('Open account menu', async () => {
            await this.click(this.selectors.accountButton);
        });
    }

    async clickLoginLink(): Promise<void> {
        await allure.step('Click login link', async () => {
            await this.page.locator(this.selectors.loginMenuItem).click();
        });
    }

    async logout(): Promise<void> {
        await allure.step('Logout from application', async () => {
            await this.openAccountMenu();
            await this.page.locator(this.selectors.logoutButton).click();
        });
    }

    async verifyBasketVisible(): Promise<void> {
        await allure.step('Verify basket button is visible', async () => {
            await this.page
                .locator(this.selectors.basketLink)
                .waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async verifyBasketInvisible(): Promise<void> {
        await allure.step('Verify basket button is invisible', async () => {
            await this.page
                .locator(this.selectors.basketLink)
                .waitFor({ state: 'hidden', timeout: 5000 });
        });
    }

    async getBasketCount(): Promise<number> {
        const text = await this.page.locator(this.selectors.basketCount).innerText();
        return parseInt(text.trim(), 10);
    }

    async verifyBasketCount(expectedCount: number): Promise<void> {
        await allure.step(`Verify basket count is ${expectedCount}`, async () => {
            const count = await this.getBasketCount();
            expect(count).toBe(expectedCount);
        });
    }

    async openBasket(): Promise<void> {
        await allure.step('Open basket page', async () => {
            await this.page.locator(this.selectors.basketLink).click();
        });
    }
}
