const logger = require('../utils/logger');

class BaseElement {

    constructor(browser, name, locator, cssLocator = true) {
        this.name = name;
        this.cssLocator = cssLocator;
        this.browser = browser;
        this.locator = locator;
    }

    async typeText(text) {
        logger.info(`Type text ${text} to element ${this.name}`)
        await (await this.getElement()).type(text);
    }

    async click() {
        logger.info(`Click element ${this.name}`)
        await (await this.getElement()).click();
    }

    async getText() {
        logger.info(`Get text from element ${this.name}`)
        return await (await (await this.getElement()).getProperty('textContent')).jsonValue();
    }

    async getElement() {
        return this.cssLocator ? await this.getElementByCss() : await this.getElementByXpath();
    }

    async getElementByCss() {
        logger.info(`Waiting element ${this.name} by CSS`)
        return await (await this.browser.pages())[0].waitForSelector(this.locator);
    }

    async getElementByXpath() {
        logger.info(`Waiting element ${this.name} by XPath`)
        return await (await this.browser.pages())[0].waitForXPath(this.locator);
    }
}

module.exports = BaseElement;