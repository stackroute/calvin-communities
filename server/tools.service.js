
const registerConsumerService = require('./common/kafkaConsumerService');
const communityToolServices = require('./communityservices/communityToolServices');


registerConsumerService(['CommunityLifecycleEvents'], {autoCommit: true, groupId: 'toolsink'}, communityToolServices);
