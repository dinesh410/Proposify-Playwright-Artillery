import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DocumentEditorPage } from '../pages/DocumentEditorPage';
import { TemplatePage } from '../pages/TemplatePage';

type Fixtures = {
 loginPage: LoginPage;
 dashboardPage: DashboardPage;
 documentEditorPage: DocumentEditorPage;
 templatePage: TemplatePage;
};

export const test = baseTest.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  documentEditorPage: async ({ page }, use) => {
    const documentEditorPage = new DocumentEditorPage(page);
    await use(documentEditorPage);
  },
  templatePage: async ({ page }, use) => {
    const templatePage = new TemplatePage(page);
    await use(templatePage);
  },
});

export const expect = test.expect;
