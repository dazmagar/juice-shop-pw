import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';
import { NavBarComponent } from './NavBar';

export class LoginComponent extends BaseComponent {
    private readonly selectors = {
        usernameInput: '#email',
        passwordInput: '#password',
        loginButton: '#loginButton',
    };

    private navBar: NavBarComponent;

    constructor(page: Page) {
        super(page, '#login-form');
        this.navBar = new NavBarComponent(page);
    }

    async enterUsername(username: string): Promise<void> {
        await allure.step('Enter username', async () => {
            await this.fill(this.selectors.usernameInput, username);
        });
    }

    async enterPassword(password: string): Promise<void> {
        await allure.step('Enter password', async () => {
            await this.fill(this.selectors.passwordInput, password);
        });
    }

    async clickLogin(): Promise<void> {
        await allure.step('Click login button', async () => {
            await this.click(this.selectors.loginButton);
        });
    }

    async auth(username: string, password: string): Promise<void> {
        await allure.step('Login with credentials', async () => {
            await this.navBar.openAccountMenu();
            await this.navBar.clickLoginLink();
            await this.waitForVisible();
            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.clickLogin();
        });
    }
}
