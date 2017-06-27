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
        category: 'communities'
    }],
};


module.exports = {
    connectionString,
    loggerConfig,
};
