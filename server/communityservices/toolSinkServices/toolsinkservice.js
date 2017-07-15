const toolSinkService = require('../../api/v1/modules/communitytools/communitytools.controller');
module.exports = function(eventMessage) {
  console.log('toolsink consumed the event: ', eventMessage);
  // console.log(eventMessage.type);
    toolSinkService.checkTool(eventMessage.tools, eventMessage.domain, (err, res) => {
      console.log('Registered tool successfully');
      if(!err) {
      toolSinkService.getTools(eventMessage.tools, eventMessage.domain), (error, result) => {
      	if(!error) {
      		console.log(result);
      	} else {
      		console.log(error);
      	}
      }
    } else {
    	console.log(err);
    }
    });

};


