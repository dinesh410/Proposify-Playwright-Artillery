import { Locator, Page } from '@playwright/test';

export class ProfileSection {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async logout() {
    await this.clickLogoutButton();
    // TODO: Add a check for the URL after logout. Using intercepts
    // await expect(this.page.url()).toContain('login');
  }
}