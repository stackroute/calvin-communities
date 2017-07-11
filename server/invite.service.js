const registerConsumerService = require('./common/kafkaConsumerService');
const memberInviteRequestService = require('./communityservices/memberInviteRequestService');


registerConsumerService(['topic4'], { autoCommit: true }, memberInviteRequestService);
