const registerConsumerService = require('./common/kafkaConsumerService');
const memberRequestsService = require('./communityservices/memberRequestsService');


registerConsumerService(['CommunityLifecycleEvents'], {autoCommit: true, groupId: 'communityevents'}, memberRequestsService);
