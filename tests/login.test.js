const resources = require("../resources.json");
const testData = require("../testData.json");
const MainPageSteps = require('./steps/mainPageSteps');
const LoginPageSteps = require('./steps/loginPageSteps');
const initBrowser = require('./base');

describe('Login in onliner', () => {
    let browser;
    let page;
    beforeEach(async () => {
        browser = await initBrowser();
        page = await (await browser.pages())[0];
        await page.setViewport({ width: resources.width, height: resources.height });
        await page.goto(resources.URL);
    });

    it('should be successful logged', async () => {
        const mainPageSteps = new MainPageSteps(browser);
        const loginPageSteps = new LoginPageSteps(browser);
        await mainPageSteps.isMainPageOpened();
        await mainPageSteps.clickLoginButton();
        await loginPageSteps.isLoginPageOpened();
        await loginPageSteps.fillLoginForm(testData.email, testData.password);
        await loginPageSteps.clickLoginButton();
        await mainPageSteps.isMainPageOpened();
        await mainPageSteps.checkProfileLabel();
    });

    it('should get error message', async () => {
        const mainPageSteps = new MainPageSteps(browser);
        const loginPageSteps = new LoginPageSteps(browser);
        await mainPageSteps.isMainPageOpened();
        await mainPageSteps.clickLoginButton();
        await loginPageSteps.isLoginPageOpened();
        await loginPageSteps.fillLoginForm(testData.email, testData.wrongPassword);
        await loginPageSteps.clickLoginButton();
        await loginPageSteps.checkErrorMessage();
    });

    afterEach(async () => {
        await page.screenshot({});
        await browser.close();
    });
});
