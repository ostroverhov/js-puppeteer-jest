const BaseElement = require('./baseElement');

class Button extends BaseElement{

    constructor(browser, name, locator) {
        super(browser, `${name} button`, locator);
    }
}

module.exports = Button;