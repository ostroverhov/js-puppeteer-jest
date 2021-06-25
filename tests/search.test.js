const resources = require("../resources.json");
const MainPageSteps = require('./steps/mainPageSteps');
const CatalogPageSteps = require('./steps/catalogPageSteps');
const searchRequest = 'Кондиционеры';
const initBrowser = require('./base');

describe('Login in onliner', () => {
    let browser;
    let page;
    beforeEach(async () => {
        browser = await initBrowser();
        page = await browser.pages()[0];
        await page.setViewport({ width: resources.width, height: resources.height });
        await page.goto(resources.URL);
    });

    it('should get catalog page', async () => {
        var mainPageSteps = new MainPageSteps(browser);
        var catalogPageSteps = new CatalogPageSteps(browser);
        await mainPageSteps.isMainPageOpened();
        await mainPageSteps.typeSearchRequest(searchRequest);
        await mainPageSteps.clickFirtCategoryItem();
        await catalogPageSteps.isCatalogPageOpened();
        await catalogPageSteps.checkPageHeader(searchRequest);
    }, 30000);

    afterEach(async () => {
        await page.screenshot({ path: 'example.png' });
        await browser.close();
    });
});
