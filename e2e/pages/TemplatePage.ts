import { Locator, Page } from '@playwright/test';

export class TemplatePage {
  readonly page: Page;
  readonly scratchTemplateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.scratchTemplateButton = page.getByTestId('start-from-scratch-button');
  }

  async clickScratchTemplateButton() {
    await this.scratchTemplateButton.click();
  }
}
