const kafka = require('kafka-node'); // configs for kafka consumer

const Client = kafka.Client;

const client = new Client('localhost:2181');

const options = {
   autoCommit: true,
   fetchMaxWaitMs: 1000,
   fetchMaxBytes: 1024 * 1024,
 };

const connectionString = { // config for cassandra
   keyspace: 'calvincommunity',
   contact: '127.0.0.1',
   port: '9042',
 };

const loggerConfig = { // config for log4js
   appenders: [{
     type: 'console',
   }, {
     type: 'file',
     filename: './../logs/logger.log',
     category: 'communities',
   }],
 };

module.exports = {
   connectionString,
   loggerConfig,
   options,
   client,
 };