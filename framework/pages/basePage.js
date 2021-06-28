const logger = require('../utils/logger');

class BasePage {

    constructor(browser, name, locator) {
        this.browser = browser;
        this.name = name;
        this.locator = locator;
    }

    async isOpened() {
        logger.info(`Is page ${this.name} opened`)
        var page = await (await this.browser.pages())[0];
        await page.waitForSelector(this.locator).catch((error) => {
                logger.warning(`${error}`);
            });
    }
}

module.exports = BasePage;