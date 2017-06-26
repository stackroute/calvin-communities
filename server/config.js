const connectionString = {
  keyspace: 'calvincommunity',
  contact: '127.0.0.1',
  port: '9042',
};

const loggerConfig = {
  appenders: [{
    type: 'file',
    filename: './../logs/logger.log',
    maxLogSize: 20480,
    backups: 10,
  }, {
    type: 'console',
  }],
};


module.exports = {
  connectionString,
  loggerConfig,
};
