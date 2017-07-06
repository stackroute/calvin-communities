
const registerConsumerService = require('./common/kafkaConsumerService');
const communityToolServices = require('./communityservices/communityToolServices');


registerConsumerService(['topic1'], { autoCommit: true }, communityToolServices);
