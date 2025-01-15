import { test } from '../fixtures/fixture';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('should successfully log in with valid credentials', async ({ loginPage, dashboardPage }) => {
        // TODO: Use a test data file to store the email and password
        // TODO: Add the email and password to the environment variables
        
        // Login with valid credentials
        // await loginPage.login('fe.testing+147@proposify.com','ufh_jkc3ktw1QTN3ajh');
        await loginPage.login(process.env.email ?? '', process.env.password ?? '');
        
        // Verify the avatar is visible
        await dashboardPage.verifyAvatarButtonVisible();
    });
});
