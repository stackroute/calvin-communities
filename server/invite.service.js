const registerConsumerService = require('./common/kafkaConsumerService');
const memberInviteService = require('./communityservices/memberInviteService');


registerConsumerService(['topic4'], { autoCommit: true }, memberInviteService);