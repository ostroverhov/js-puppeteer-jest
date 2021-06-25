const MainPage = require('../pages/mainPage');
const BaseStep = require('../../framework/steps/baseStep');

class MainPageSteps extends BaseStep {

    constructor(browser) {
        super();
        this.mainPage = new MainPage(browser);
    }

    async isMainPageOpened() {
        await this.logAssertion(this.isMainPageOpened.name);
        await this.mainPage.isOpened();
    }

    async typeSearchRequest(request) {
        await this.logStep(this.typeSearchRequest.name);
        await this.mainPage.typeTextInSearchTextBox(request);
    }

    async goToSearchFrame() {
        await this.logStep(this.goToSearchFrame.name);
        return await this.mainPage.getSearchFrame();
    }

    async clickFirtCategoryItem() {
        await this.logStep(this.clickFirtCategoryItem.name);
        await this.mainPage.clickFirstCategory();
    }

    async clickLoginButton() {
        await this.logStep(this.clickLoginButton.name);
        await this.mainPage.clickLoginButton()
    }

    async checkProfileLabel() {
        await this.logAssertion(this.checkProfileLabel.name);
        await this.mainPage.isProfileLabelPresent();
    }
}

module.exports = MainPageSteps;