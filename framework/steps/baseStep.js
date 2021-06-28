const logger = require('../utils/logger');

class BaseStep {

    async logStep(stepInfo = '') {
        logger.info(`### Step ${stepInfo}###`);
    }

    async logAssertion(assertionInfo = '') {
        logger.info(`### Assertion ${assertionInfo}###`);
    }
}

module.exports = BaseStep;