import * as allure from 'allure-js-commons';

import { test } from './_fixtures';

test.describe('Authentication Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('L-1: User can login with valid credentials and search product', async ({ app }) => {
        allure.tags('Authentication');
        allure.severity(allure.Severity.CRITICAL);

        await app.login.auth(process.env.USER_EMAIL ?? '', process.env.USER_PASSWORD ?? '');
        await app.navBar.verifyBasketVisible();
        await app.navBar.logout();
        await app.navBar.verifyBasketInvisible();
    });
});
