const BasePage = require('../../framework/pages/basePage');
const TextBox = require('../../framework/elements/textBox');
const Button = require('../../framework/elements/button');
const Label = require('../../framework/elements/label');
const elements = {
    emailTextBox: (browser) => new TextBox(browser, 'email', '[placeholder="Ник или e-mail"]'),
    passwordTextBox: (browser) => new TextBox(browser, 'password', '[type=password]'),
    loginButton: (browser) => new Button(browser, 'Login', '.auth-button.auth-button_middle'),
    errorLabel: (browser) => new Label(browser, 'Error message', '.auth-form__description_error')
};

class LoginPage extends BasePage {

    constructor(browser) {
        super(browser, 'Login page', '#auth-container');
    }

    async typeEmail(email) {
        await elements.emailTextBox(this.browser).typeText(email);
    }

    async typePassword(password) {
        await elements.passwordTextBox(this.browser).typeText(password);
    }

    async clickLoginButton() {
        await elements.loginButton(this.browser).click();
    }

    async getErrorMessage() {
        return await elements.errorLabel(this.browser).getText();
    }
}

module.exports = LoginPage;