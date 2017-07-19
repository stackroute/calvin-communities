const registerConsumerService = require('./common/kafkaConsumerService');
const toolSinkServices = require('./communityservices/toolSinkServices');

registerConsumerService(['ToolEvents'], { autoCommit: true }, toolSinkServices);
