const consoleLogging = (tag, text) => {
    console.log(`${new Date().toISOString()} [${tag.toUpperCase()}] - ${text}`);
};

class Logger {

    info(text) {
        consoleLogging('info', text);
    }

    warning(text) {
        consoleLogging('warning', text);
    }

    error(text) {
        consoleLogging('error', text);
    }
}

module.exports = new Logger();