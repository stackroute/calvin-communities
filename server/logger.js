const log4js = require('log4js');

const config = require('./config').loggerConfig;

log4js.configure(config);

const logger = log4js.getLogger('communities');

module.exports = logger;
