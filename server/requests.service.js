const registerConsumerService = require('./common/kafkaConsumerService');
const memberRequestService = require('./communityservices/memberRequestService');


registerConsumerService(['topic5'], { autoCommit: true }, memberRequestService);