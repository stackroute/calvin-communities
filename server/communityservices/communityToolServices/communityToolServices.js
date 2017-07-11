const toolService = require('../../api/v1/modules/tools/tools.services');
module.exports = function(eventMessage) {
  console.log('Got a new community event message: ', eventMessage);
  console.log(eventMessage.type);
  if (eventMessage.type === "add") {
    toolService.addTools(eventMessage.tools, eventMessage.domain, (err, res) => {
      console.log('insde the tool');
    });
  }
  if (eventMessage.type === "delete") {
    console.log("delete", eventMessage);
    toolService.deleteTools(eventMessage.domain, (err, res) => {
      console.log('insde delete');
    });
  }
};
