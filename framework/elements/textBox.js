const BaseElement = require('./baseElement');

class TextBox extends BaseElement {

    constructor(browser, name, locator) {
        super(browser, `${name} textBox`, locator);
    }
}

module.exports = TextBox;