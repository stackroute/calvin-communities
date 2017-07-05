const registerConsumerService = require('./common/kafkaConsumerService');
const communityToolServices = require('./communityToolServices/communityToolServices');

registerConsumerService(['topic1'], { autoCommit: true }, communityToolServices);
