const path = require('path');
const extend = require('util')._extend;

const defaults = {
  NODE_ENV: process.env.NODE_ENV
};

const appConfig = {
  development: extend(require('./env/development'), defaults),
  dbconfig: {
    dburl: '127.0.0.1',
    keyspacename: 'calvincommunity',
  },
  appConstants: {
    secret: 'secret key',
    expiryTime: 60 * 500,
  },
};

let env = process.env.NODE_ENV || 'development';

process.stdout.write(`\nConfiguring for environment: ${env}`);

const effectiveConfig = appConfig[env];

process.stdout.write(`\nconfig settings: ${JSON.stringify(effectiveConfig)}\n`);

module.exports = effectiveConfig;