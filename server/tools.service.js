
let registerConsumerService = require('./common/kafkaConsumerService');
let communityToolServices = require('./communityservices/communityToolServices');


registerConsumerService(['topic1'], { autoCommit: true }, communityToolServices);
