const registerConsumerService = require('./common/kafkaConsumerService');
const communityNotificationService = require('./communityservices/communityNotificationService');



registerConsumerService(['toolEvents'], { autoCommit: true }, communityNotificationService);
