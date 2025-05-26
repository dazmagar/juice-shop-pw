import { AppPage } from '@pages/AppPage';
import { test as base, type BrowserContext } from '@playwright/test';

export const test = base.extend<{ app: AppPage; context: BrowserContext }>({
    context: async ({ context }, use) => {
        const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 5;
        await context.addCookies([
            {
                name: 'cookieconsent_status',
                value: 'dismiss',
                domain: 'localhost',
                path: '/',
                expires,
                httpOnly: false,
                secure: false,
                sameSite: 'Lax',
            },
            {
                name: 'welcomebanner_status',
                value: 'dismiss',
                domain: 'localhost',
                path: '/',
                expires,
                httpOnly: false,
                secure: false,
                sameSite: 'Lax',
            },
        ]);
        await use(context);
    },
    app: async ({ page }, use) => {
        await use(new AppPage(page));
    },
});

export { expect } from '@playwright/test';
