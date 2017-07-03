const kafka = require('kafka-node');


const Client = kafka.Client;

const connectionString = {
  keyspace: 'calvincommunity',
  contact: '127.0.0.1',
  port: '9042',
};

const loggerConfig = {
  appenders: [{
    type: 'console',
  }, {
    type: 'file',
    filename: './../logs/logger.log',
    category: 'communities',
  }],
};

const client = new Client('localhost:2181');

const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024
};


module.exports = {
  connectionString,
  loggerConfig,
  options,
  client
};
