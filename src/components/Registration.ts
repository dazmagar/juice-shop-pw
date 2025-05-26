import { type Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { BaseComponent } from './Base';
import { NavBarComponent } from './NavBar';

export class RegistrationComponent extends BaseComponent {
    private readonly selectors = {
        registerLink: '#newCustomerLink a',
        emailInput: '#emailControl',
        passwordInput: '#passwordControl',
        repeatPasswordInput: '#repeatPasswordControl',
        securityQuestionSelect: 'mat-select[name="securityQuestion"]',
        securityOption: (text: string) => `mat-option:has-text("${text}")`,
        securityAnswerInput: '#securityAnswerControl',
        registerButton: '#registerButton',
        successMessage: 'simple-snack-bar .mdc-snackbar__label',
    };

    private navBar: NavBarComponent;

    constructor(page: Page) {
        super(page, '#registration-form');
        this.navBar = new NavBarComponent(page);
    }

    async openRegistrationForm(): Promise<void> {
        await allure.step('Open registration form link', async () => {
            const link = this.page.locator(this.selectors.registerLink);
            await link.waitFor({ state: 'visible', timeout: 5000 });
            await link.click();
            await this.waitForVisible();
        });
    }

    async enterEmail(email: string): Promise<void> {
        await allure.step('Enter registration email', async () => {
            await this.fill(this.selectors.emailInput, email);
        });
    }

    async enterPassword(password: string): Promise<void> {
        await allure.step('Enter registration password', async () => {
            await this.fill(this.selectors.passwordInput, password);
        });
    }

    async enterRepeatPassword(password: string): Promise<void> {
        await allure.step('Enter repeat password', async () => {
            await this.fill(this.selectors.repeatPasswordInput, password);
        });
    }

    async selectSecurityQuestion(question: string): Promise<void> {
        await allure.step('Select security question', async () => {
            await this.page.locator(this.selectors.securityQuestionSelect).click();
            await this.page.locator(this.selectors.securityOption(question)).click();
        });
    }

    async enterSecurityAnswer(answer: string): Promise<void> {
        await allure.step('Enter security answer', async () => {
            await this.fill(this.selectors.securityAnswerInput, answer);
        });
    }

    async clickRegister(): Promise<void> {
        await allure.step('Click register button', async () => {
            await this.click(this.selectors.registerButton);
        });
    }

    async verifySuccessNotification(expectedText: string): Promise<void> {
        await allure.step('Verify registration success notification', async () => {
            const notification = this.page
                .locator(this.selectors.successMessage)
                .filter({ hasText: expectedText })
                .first();
            await notification.waitFor({ state: 'visible', timeout: 5000 });
            await expect(notification).toHaveText(expectedText);
        });
    }

    async register(
        email: string,
        password: string,
        question: string,
        answer: string,
    ): Promise<void> {
        await allure.step('Register user', async () => {
            await this.navBar.openAccountMenu();
            await this.navBar.clickLoginLink();
            await this.openRegistrationForm();
            await this.enterEmail(email);
            await this.enterPassword(password);
            await this.enterRepeatPassword(password);
            await this.selectSecurityQuestion(question);
            await this.enterSecurityAnswer(answer);
            await this.clickRegister();
        });
    }
}
