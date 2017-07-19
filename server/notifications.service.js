const registerConsumerService = require('./common/kafkaConsumerService');
const communityNotificationService = require('./communityservices/communityNotificationService');


registerConsumerService(['CommunityLifecycleEvents'], { autoCommit: true }, communityNotificationService);

