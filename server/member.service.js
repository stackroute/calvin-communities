const registerConsumerService = require('./common/kafkaConsumerService');
const membershipServices = require('./communityservices/membersregistryservices');


registerConsumerService(['CommunityLifecycleEvents'], { autoCommit: true }, membershipServices);
