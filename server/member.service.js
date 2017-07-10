const registerConsumerService = require('./common/kafkaConsumerService');
const membershipServices = require('./communityservices/membersregistryservices');


registerConsumerService(['topic3'], { autoCommit: true }, membershipServices);
