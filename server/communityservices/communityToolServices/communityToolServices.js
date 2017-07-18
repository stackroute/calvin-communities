const logger = require('../../logger');
const toolService = require('../../api/v1/modules/tools/tools.controller');
module.exports = function(eventMessage) {
  logger.debug('Got a new community event message: ', eventMessage);
  logger.debug(eventMessage.type);
  if (eventMessage.type === "addtool") {
    logger.debug(eventMessage.tools);
    toolService.postTools(eventMessage.tools, eventMessage.domain, (err, res) => {
      if (res)
        logger.debug('insde the tool');
      if (err)
        logger.debug('error');
    });
  }
  if (eventMessage.type === "deletetool") {
    logger.debug("delete", eventMessage);
    toolService.deleteTool(eventMessage.domain, (err, res) => {
      logger.debug('insde delete');
    });
  }
};
