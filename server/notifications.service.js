const registerConsumerService = require('./common/kafkaConsumerService');
const communityNotificationService = require('./communityservices/communityNotificationService');


registerConsumerService(['CommunityLifecycleEvents','CommunityActivityEvents' ], { autoCommit: true }, communityNotificationService);

