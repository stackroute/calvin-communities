const registerConsumerService = require('./common/kafkaConsumerService');
const memberRequestsService = require('./communityservices/memberRequestsService');


registerConsumerService(['topic4'], { autoCommit: true }, memberRequestsService);
