const toolSinkService = require('../../api/v1/modules/communitytools/communitytools.controller');
module.exports = function(eventMessage) {
  console.log('toolsink consumed the event: ', eventMessage);
  // console.log(eventMessage.type);
  // if (eventMessage.type === "add") {
  //   toolSinkService.checkTool(eventMessage.tools, eventMessage.domain, (err, res) => {
  //     console.log('inside the tool');
  //   });
  // }
};
