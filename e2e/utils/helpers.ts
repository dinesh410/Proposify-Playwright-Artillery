import { Page } from '@playwright/test';

export class Helpers {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async fillElement(selector: string, text: string) {
        await this.page.evaluate(
            ({ selector, text }) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.textContent = text;
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                    element.dispatchEvent(new Event('change', { bubbles: true }));
                }
            },
            { selector, text }
        );
    }
}