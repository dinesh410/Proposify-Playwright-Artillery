import { test } from '../fixtures/fixture';
import path from 'path';

test.describe('UI Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('fe.testing+147@proposify.com', 'ufh_jkc3ktw1QTN3ajh');
    });

    test('should successfully reorder the rows of a table', async ({ dashboardPage, documentEditorPage, templatePage }) => {
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

    test('should successfully resize an image', async ({ dashboardPage, documentEditorPage, templatePage }) => {
        // Provide the path to the image file
        const imagePath = path.resolve(__dirname, '../fixtures/testData/images/playwright-logo.jpg');

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