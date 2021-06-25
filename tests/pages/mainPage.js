const BasePage = require('../../framework/pages/basePage');
const TextBox = require('../../framework/elements/textBox');
const Button = require('../../framework/elements/button');
const Label = require('../../framework/elements/label');
const locators = {
    searchFrameLocator: 'iframe[src="/sdapi/catalog/search/iframe"]',
    categoryItemLocator: 'a[class=category__title]'
};
const elements = {
    searchTextBox: (browser) => new TextBox(browser, 'Search', '.fast-search__input'),
    loginButton: (browser) => new Button(browser, 'Login', '.auth-bar__item--text'),
    profileLabel: (browser) => new Label(browser, 'Profile', '.b-top-profile__image')
};

class MainPage extends BasePage {

    constructor(browser) {
        super(browser, 'Main page', '.fast-search__input');
    }

    async typeTextInSearchTextBox(text) {
        await elements.searchTextBox(this.browser).typeText(text);
    }

    async clickFirstCategory() {
        await (await (await this.getSearchFrame()).waitForSelector(locators.categoryItemLocator)).click();
    }

    async getSearchFrame() {
        return await (await (await this.browser.pages())[0].$(locators.searchFrameLocator)).contentFrame();
    }

    async clickLoginButton() {
        await elements.loginButton(this.browser).click();
    }

    async isProfileLabelPresent() {
        await elements.profileLabel(this.browser).getElement();
    }
}

module.exports = MainPage;