let registerConsumerService = require('./common/kafkaConsumerService');
let communityToolServices = require('./communityToolServices/communityToolServices');

registerConsumerService(['topic1'], {autoCommit: true }, communityToolServices);