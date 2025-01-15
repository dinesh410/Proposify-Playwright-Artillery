import { test } from '../fixtures/fixture';
import { USERS } from '../fixtures/testData/userCredentials.json';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('should successfully log in with valid credentials', async ({ loginPage, dashboardPage }) => {
        // TODO: Use a test data file to store the email and password
        // TODO: Add the email and password to the environment variables
        
        // Login with valid credentials.
        await loginPage.login((process.env.email ?? USERS.user1.email), (process.env.password ?? USERS.user1.password));
        
        // Verify the avatar is visible
        await dashboardPage.verifyAvatarButtonVisible();
    });
});
