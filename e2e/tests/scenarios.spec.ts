import { test } from '../fixtures/fixture';
import { USERS } from '../fixtures/testData/userCredentials.json';

test.describe('UI Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('should successfully reorder the rows of a table', async ({ loginPage, dashboardPage, documentEditorPage, templatePage }) => {
        // TODO: Add login in beforeEach hook. Tests are flaky when adding this in beforeEach hook.
        await loginPage.login(USERS.user2.email,USERS.user2.password);
        dashboardPage.verifyAvatarButtonVisible();

        const addedText = 'This is a test text';

        // Create a New Document
        await dashboardPage.createNewV3Document();

        // Start from scratch
        await templatePage.clickScratchTemplateButton();

        // Just for testing purposes, we are using existing document
        //await dashboardPage.openExistingDocument();

        // Create a new table by drag and drop
        await documentEditorPage.addTableOnCanvas('Text Table');

        // Select a row and add text in the row
        await documentEditorPage.selectCellAndAddText(1, 1, addedText);

        // Reorder rows
        await documentEditorPage.reorderTableRow(1, 2);

        // Verify the rows are reordered
        await documentEditorPage.verifyTableRowOrder(2, 1, addedText);
    });

    test('should successfully resize an image', async ({ loginPage, dashboardPage, documentEditorPage, templatePage }) => {
        // TODO: Add login in beforeEach hook. Tests are flaky when adding this in beforeEach hook.
        await loginPage.login(USERS.user3.email,USERS.user3.password);
        dashboardPage.verifyAvatarButtonVisible();
        
        // Provide the path to the image file
        const imagePath = './e2e/fixtures/testData/images/playwright-logo.jpg';

        // Create a New Document
        await dashboardPage.createNewV3Document();

        // Start from scratch
        await templatePage.clickScratchTemplateButton();

        // Just for testing purposes, we are using existing document
        // await dashboardPage.openExistingDocument();

        // Upload a new image file
        await documentEditorPage.uploadImage(imagePath);

        // Drag and drop the image on the canvas
        await documentEditorPage.addImageOnCanvas();

        // Resize the image on the canvas and get the new dimensions
        const { width, height } = await documentEditorPage.resizeImage();

        // Verify the resized image dimensions
        await documentEditorPage.verifyResizedImage(width, height);
    });
});