import { chromium } from "playwright";
import { LoginPage } from "../../e2e/pages/LoginPage";
import { DashboardPage } from "../../e2e/pages/DashboardPage";
import { ProfileSection } from "../../e2e/pages/ProfileSection";

export async function loginLogout() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const profileSection = new ProfileSection(page);

  // Perform actions
  await page.goto('https://app.proposify.com/login');
  await loginPage.login("fe.testing+1696280741038@proposify.com", "ufh_jkc3ktw1QTN3ajh");
  await dashboardPage.createNewV3Document();
  await dashboardPage.clickAvatarButton();
  await profileSection.logout();

  await browser.close();
}
  

/*
const { chromium } = require("playwright");
const { LoginPage } = require("../../e2e/pages/LoginPage");
const { DashboardPage } = require("../../e2e/pages/DashboardPage");
const { ProfileSection } = require("../../e2e/pages/ProfileSection");

async function loginLogout() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const profileSection = new ProfileSection(page);

  // Perform actions
  await loginPage.navigate();
  await loginPage.login("fe.testing+1696280741038@proposify.com", "ufh_jkc3ktw1QTN3ajh");
  await dashboardPage.createNewV3Document();
  await dashboardPage.clickAvatarButton();
  await profileSection.logout();

  await browser.close();
}

module.exports = { loginLogout };
*/
