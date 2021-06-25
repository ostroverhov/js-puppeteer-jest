const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'))
    await super.setup()
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'))
    await super.teardown()
  }
}

module.exports = PuppeteerEnvironment
