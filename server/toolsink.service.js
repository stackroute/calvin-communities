const registerConsumerService = require('./common/kafkaConsumerService');
const toolSinkServices = require('./communityservices/toolSinkServices');

registerConsumerService(['toolEvents'], { autoCommit: true }, toolSinkServices);
