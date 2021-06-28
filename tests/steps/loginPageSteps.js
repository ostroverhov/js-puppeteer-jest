const LoginPage = require('../pages/loginPage');
const BaseStep = require('../../framework/steps/baseStep');
const chai = require('chai')
const errorMessage = 'Неверный логин или пароль';

class LoginPageSteps extends BaseStep {

    constructor(browser) {
        super();
        this.loginPage = new LoginPage(browser);
    }

    async isLoginPageOpened() {
        await this.logAssertion(this.isLoginPageOpened.name);
        await this.loginPage.isOpened();
    }

    async fillLoginForm(email, password) {
        await this.logStep(this.fillLoginForm.name);
        await this.loginPage.typeEmail(email);
        await this.loginPage.typePassword(password);
    }

    async clickLoginButton() {
        await this.logStep(this.clickLoginButton.name);
        await this.loginPage.clickLoginButton();
    }

    async checkErrorMessage() {
        await this.logAssertion(this.checkErrorMessage.name);
        chai.expect(await this.loginPage.getErrorMessage()).contain(errorMessage);
    }
}

module.exports = LoginPageSteps;