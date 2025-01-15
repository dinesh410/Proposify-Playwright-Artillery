export const config = {
    target: 'https://app.proposify.net',
    engines: {
        playwright: {}
    }
};

export const scenarios = [{
    engine: 'playwright',
    testFunction: './artillery-playwright-preprocessor.ts'
}];