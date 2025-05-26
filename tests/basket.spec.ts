import * as allure from 'allure-js-commons';

import { test } from './_fixtures';

test.describe('Basket Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('B-1: User can add product to basket', async ({ app }) => {
        allure.tags('Basket');
        allure.severity(allure.Severity.CRITICAL);

        await app.login.auth(
            process.env.USER_EMAIL ?? 'tester1@test.com',
            process.env.USER_PASSWORD ?? 'zaq1@WSX',
        );
        await app.navBar.verifyBasketVisible();

        await app.searchResult.addToBasket('Apple Juice');
        await app.navBar.verifyBasketCount(1);

        await app.searchResult.addToBasket('Orange Juice');
        await app.navBar.verifyBasketCount(2);

        await app.basket.open();
        await app.basket.verifyTotalPrice();
        await app.basket.proceedToCheckout();

        await app.addressSelect.waitForAddressSelectVisible();
        await app.addressSelect.verifyAndAddAddress();
        await app.addressSelect.continueToDelivery();

        await app.deliveryAddress.waitForDeliveryAddressVisible();
        await app.deliveryAddress.selectDeliveryOption('Standard Delivery');
        await app.deliveryAddress.continueToPayment();

        await app.payment.waitForPaymentVisible();
        await app.payment.pay();
        await app.payment.continueToReview();

        await app.orderSummary.waitForOrderSummaryVisible();
        await app.orderSummary.placeOrderAndPay();

        await app.orderCompletion.waitForOrderCompletionVisible();
        await app.orderCompletion.verifyThankYou();

        await app.navBar.goHome();
    });
});
