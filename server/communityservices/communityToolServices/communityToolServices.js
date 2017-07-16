const toolService = require('../../api/v1/modules/tools/tools.controller');
module.exports = function(eventMessage) {
  console.log('Got a new community event message: ', eventMessage);
  console.log(eventMessage.type);
  if (eventMessage.type === "add") {
    console.log(eventMessage.tools);
    toolService.postTools(eventMessage.tools, eventMessage.domain, (err, res) => {
      if (res)
        console.log('insde the tool');
      if (err)
        console.log('error');
    });
  }
  if (eventMessage.type === "delete") {
    console.log("delete", eventMessage);
    toolService.deleteTool(eventMessage.domain, (err, res) => {
      console.log('insde delete');
    });
  }
};
