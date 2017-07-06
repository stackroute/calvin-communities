
const toolService = require('../../api/v1/modules/tools/tools.services');
module.exports = function (eventMessage) {
  console.log('Got a new community event message: ', eventMessage);
   console.log('domain', eventMessage);
  toolService.addTools(eventMessage.tools, eventMessage.domain, (err, res) => {
    console.log('insde the tool');
  });
};

