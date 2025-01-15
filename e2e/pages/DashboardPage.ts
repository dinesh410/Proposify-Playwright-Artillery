
import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly avatarButton: Locator;
  readonly createDocumentButton: Locator;
  readonly v3DocumentButton: Locator;
  readonly documentList: Locator;
  readonly documentTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatarButton = page.getByTestId('avatar-button');
    this.createDocumentButton = page.getByTestId('create-document-button');
    this.v3DocumentButton = page.getByTestId('create-document-button-v3');
    this.documentList = page.getByTestId('document-list');
    this.documentTitle = page.getByTestId('document-title');
  }

  async openExistingDocument() {
    await this.documentTitle.nth(0).click();
  }

  async clickCreateDocumentButton() {
    await this.createDocumentButton.click();
  }

  async clickV3DocumentButton() {
    await this.v3DocumentButton.click();
  }

  async createNewV3Document() {
    await this.clickCreateDocumentButton();
    await this.clickV3DocumentButton();
  }

  async clickAvatarButton() {
    await this.avatarButton.click();
  }

  async verifyAvatarButtonVisible() {
    await expect(this.avatarButton).toBeVisible();
  }
}
