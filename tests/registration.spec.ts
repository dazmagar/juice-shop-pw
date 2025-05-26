import * as allure from 'allure-js-commons';

import { test } from './_fixtures';

test.describe('Registration Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('R-1: User can register with valid data', async ({ app }) => {
        allure.tags('Registration');
        allure.severity(allure.Severity.CRITICAL);

        await app.registration.register(
            process.env.USER_EMAIL || 'tester1@test.com',
            process.env.USER_PASSWORD || 'zaq1@WSX',
            // eslint-disable-next-line quotes
            process.env.USER_QUESTION || "Mother's maiden name?",
            process.env.USER_ANSWER || 'Mother',
        );
        await app.registration.verifySuccessNotification(
            'Registration completed successfully. You can now log in.',
        );
    });
});
