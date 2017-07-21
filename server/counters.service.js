const registerConsumerService = require('./common/kafkaConsumerService');
const communityCounterService = require('./communityservices/communityCounterService');

// console.log('in counters.service');
registerConsumerService(['CommunityLifecycleEvents'], {autoCommit: true, groupId: 'communityevents'}, communityCounterService);
