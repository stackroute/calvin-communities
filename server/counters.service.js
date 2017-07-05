const registerConsumerService = require('./common/kafkaConsumerService');
const communityCounterService = require('./communityservices/communityCounterService');

registerConsumerService(['topic1'], { autoCommit: true }, communityCounterService);
