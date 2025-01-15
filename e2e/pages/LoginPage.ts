import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#pyLoginEmail');;
    this.passwordInput = page.locator('#pyLoginPassword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
    // TODO: Add a check for the URL after login. Using intercepts
    // await expect(this.page.url()).toContain('pipeline');
  }
}