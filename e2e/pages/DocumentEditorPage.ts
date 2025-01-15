
import { Locator, Page, expect } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class DocumentEditorPage {
    readonly page: Page;
    readonly editorCanvas: Locator;
    readonly textBlock: Locator;
    readonly contentTabButton: Locator;
    readonly tableBlockButton: Locator;
    readonly textTableBlockButton: Locator;
    readonly pricingTableBlockButton: Locator;
    readonly tableBlock: Locator;
    readonly tableRow: (row: number) => Locator;
    readonly tableCell: (row: number, column: number) => Locator;
    readonly reOrderButton: Locator;
    readonly imageBlockButton: Locator;
    readonly uploadImageButton: Locator;
    readonly fileInput: Locator;
    readonly imageList: Locator;
    readonly imageBlock: Locator;
    readonly dragIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.editorCanvas = page.getByTestId('editor-page');
        this.textBlock = page.getByTestId('text-block');
        this.contentTabButton = page.locator('#content_tab');
        this.tableBlockButton = page.getByTestId('table-block-button');
        this.textTableBlockButton = page.getByTestId('text-table-block-button');
        this.pricingTableBlockButton = page.getByTestId('pricing-table-block-button');
        this.tableBlock = page.getByTestId('table-block-test-id');
        this.tableRow = (row: number) => this.tableBlock.locator(`div[aria-rowindex="${row + 2}"]`);
        this.tableCell = (row: number, column: number) => this.tableBlock.locator(`div[aria-rowindex="${row + 2}"]`).locator(`div[aria-colindex="${column + 1}"]`);
        this.reOrderButton = page.locator('div[data-field="__reorder__"]');
        this.imageBlockButton = page.getByTestId('image-block-button');
        this.uploadImageButton = page.locator('div.upload-button-container[role="button"]');
        this.fileInput = page.getByTestId('file-input');
        this.imageList = page.locator('div.image__content__section img');
        this.imageBlock = page.getByTestId('image-block');
        this.dragIcon = page.getByTestId('DragIcon');

    }

    async openContentBlock() {
        await this.contentTabButton.click();
    }

    async openTableBlock() {
        await this.tableBlockButton.click();
    }

    async selectImageBlock() {
        await this.imageBlockButton.click();
    }

    async clickUploadImage() {
        await this.uploadImageButton.click();
    }

    async addTextTableOnCanvas() {
        const editorCanvasBoundingBox = await this.editorCanvas.boundingBox();
        if (!editorCanvasBoundingBox) {
            throw new Error('Editor canvas bounding box not found');
        }
        await this.textTableBlockButton.dragTo(this.editorCanvas, {
            targetPosition: { x: 0, y: editorCanvasBoundingBox.height / 2 }
        });
    }

    async addPricingTableOnCanvas() {
        await this.pricingTableBlockButton.dragTo(this.editorCanvas);
    }

    async addTableOnCanvas(tableType: string) {
        await this.openContentBlock();
        await this.openTableBlock();
        if (tableType === 'Text Table') {
            await this.addTextTableOnCanvas();
        } else {
            await this.addPricingTableOnCanvas();
        }
    }

    async selectCellAndAddText(row: number, column: number, text: string) {
        const helpers = new Helpers(this.page);
        await this.tableBlock.dblclick({ force: true });
        await helpers.fillElement(`div[aria-rowindex="${row + 2}"] div[aria-colindex="${column + 1}"]`, text);
        await this.page.waitForTimeout(1000);
    }

    async reorderTableRow(fromRow: number, toRow: number) {
        const fromRowElement = await this.dragIcon.nth(fromRow);
        const toRowElement = await this.dragIcon.nth(toRow);
        await expect(fromRowElement).toBeVisible();
        await expect(toRowElement).toBeVisible();
        await fromRowElement.hover();
        await this.page.mouse.down();
        await toRowElement.hover();
        await this.page.mouse.up();
    }

    async verifyTableRowOrder(expectedRowIndex: number, actualRowIndex: number, expectedText: string) {
        const actualRowText = await this.tableRow(actualRowIndex).textContent();

        const expectedRowText = await this.tableRow(expectedRowIndex).textContent();

        expect(actualRowText).not.toContain(expectedText);
        expect(expectedRowText).toContain(expectedText);
    }

    async uploadImage(imagePath: string) {
        await this.openContentBlock();
        await this.selectImageBlock();
        await this.clickUploadImage();
        await this.fileInput.setInputFiles(imagePath);
    }

    async addImageOnCanvas() {
        const editorCanvasBoundingBox = await this.editorCanvas.boundingBox();
        if (!editorCanvasBoundingBox) {
            throw new Error('Editor canvas bounding box not found');
        }
        // TODO: Adding the first image from the image list to the canvas. Need to update this to select a specific image
        await this.imageList.first().dragTo(this.editorCanvas, {
            targetPosition: { x: 0, y: editorCanvasBoundingBox.height / 2 }
        });
    }

    async resizeImage(): Promise<{ width: number; height: number }> {
        // TODO: Need to update this to select a specific image block
        // Locate the resize handle
        const resizeHandle = this.imageBlock.first().getByTestId('grid_block_resize_handle_test_bottomRight');

        // Get the bounding box of the resize handle
        const box = await resizeHandle.boundingBox();

        if (box) {
            // Simulate dragging the resize handle to resize the image
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(box.x + 100, box.y + 100); // Adjust the values as needed
            await this.page.mouse.up();

            // Get the new bounding box of the image
            const image = this.imageBlock.first().locator('img');
            const newBox = await image.boundingBox();

            if (newBox) {
                return { width: newBox.width, height: newBox.height };
            } else {
                throw new Error('Could not get bounding box of the resized image.');
            }
        } else {
            throw new Error('Could not get bounding box of the resize handle.');
        }
    }

    async verifyResizedImage(expectedWidth: number, expectedHeight: number) {
        // TODO: Need to update this to select a specific image
        // Locate the image
       const image = this.imageBlock.first().locator('img');

        // Get the bounding box of the image
        const box = await image.boundingBox();

        if (box) {
            // Verify the dimensions of the image
            if (box.width !== expectedWidth || box.height !== expectedHeight) {
                throw new Error(`Image dimensions are incorrect. Expected: ${expectedWidth}x${expectedHeight}, Actual: ${box.width}x${box.height}`);
            }
        } else {
            throw new Error('Could not get bounding box of the image.');
        }
    }

}
