import { type Locator, type Page } from '@playwright/test';

export class BaseComponent {
    protected readonly page: Page;
    protected readonly root: Locator;

    constructor(page: Page, rootSelector: string) {
        this.page = page;
        this.root = page.locator(rootSelector);
    }

    protected async waitForVisible(timeout = 10000): Promise<void> {
        await this.root.waitFor({ state: 'visible', timeout });
    }

    protected async getElement(selector: string): Promise<Locator> {
        return this.root.locator(selector);
    }

    protected async getText(selector: string): Promise<string> {
        const element = await this.getElement(selector);
        return element.innerText();
    }

    protected async click(selector: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.click();
    }

    protected async fill(selector: string, text: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.fill(text);
    }

    protected async isVisible(selector: string): Promise<boolean> {
        const element = await this.getElement(selector);
        return element.isVisible();
    }
}
