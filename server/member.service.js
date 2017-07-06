const registerConsumerService = require('./common/kafkaConsumerService');
const membershipServices = require('./communityservices/membersregistryservices');


registerConsumerService(['topic1'], { autoCommit: true }, membershipServices);