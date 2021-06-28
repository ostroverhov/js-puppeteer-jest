const CatalogPage = require('../pages/catalogPage');
const BaseStep = require('../../framework/steps/baseStep');
const chai = require('chai')

class CatalogPageSteps extends BaseStep {

    constructor(browser) {
        super();
        this.catalogPage = new CatalogPage(browser);
    }

    async isCatalogPageOpened() {
        await this.logAssertion(this.isCatalogPageOpened.name);
        await this.catalogPage.isOpened();
    }

    async checkPageHeader(header) {
        await this.logAssertion(this.checkPageHeader.name);
        chai.expect(await this.catalogPage.getHeaderPageText()).contain(header);
    }
}

module.exports = CatalogPageSteps;