const puppeteer = require('puppeteer');
const resources = require("../resources.json");

 async function initBrowser() {
    return await puppeteer.launch({
        headless: resources.headless,
        args: [
            '--start-maximized'
        ]
    });
};

module.exports = initBrowser;