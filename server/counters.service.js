const registerConsumerService = require('./common/kafkaConsumerService');
const communityCounterService = require('./communityservices/communityCounterService');

// console.log('in counters.service');
registerConsumerService(['topic2'], { autoCommit: true }, communityCounterService);
