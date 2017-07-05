let registerConsumerService = require('./common/kafkaConsumerService');
let communityCounterService = require('./communityservices/communityCounterService');

registerConsumerService(['topic1'], {autoCommit: true }, communityCounterService);