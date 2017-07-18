const toolSinkService = require('../../api/v1/modules/communitytools/communitytools.controller');
const registerPublisherService = require('../../common/kafkaPublisher');
const logger = require('../../logger.js');
module.exports = function(eventMessage) {
  logger.debug('toolsink consumed the event: ', eventMessage);
  // message = { domain: dataFromURI, tools: dataFromBody, type: 'addtool' };
  let message = JSON.stringify(eventMessage);
  logger.debug("sending message", message);
  registerPublisherService.publishToTopic('CommunityActvityEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else if (res) {
      logger.debug('result is', res);
    }
  });
};
