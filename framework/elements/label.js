const BaseElement = require('./baseElement');

class Label extends BaseElement {

    constructor(browser, name, locator) {
        super(browser, `${name} label`, locator);
    }
}

module.exports = Label;