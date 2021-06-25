const BasePage = require('../../framework/pages/basePage');
const Label = require('../../framework/elements/label');

const elements = {
    pageHeaderLabel: (browser) => new Label(browser, 'Page header', '.schema-header__title'),
};

class CatalogPage extends BasePage {

    constructor(browser) {
        super(browser, 'Catalog page', '[class~=catalog-content]');
    }

    async getHeaderPageText() {
        return await elements.pageHeaderLabel(this.browser).getText();
    }
}

module.exports = CatalogPage;