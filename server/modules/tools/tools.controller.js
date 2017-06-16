/* ---------------------CONTROLLER----------------------*/

const communityToolService = require('./tools.services'); //

// Function for Getting tools

function getTools(domainName, done) {
  communityToolService.getTools(domainName, done);
}

// Function for Posting tools

function postTools(dataFromBody, done) {
  if (dataFromBody.domain && dataFromBody.id) {
    if (dataFromBody.domain !== null && dataFromBody.id != null) {
      communityToolService.addTools(dataFromBody, done);
    } else {
      return 'please fill out all fields!!';
    }
  } else {
    return 'please fill out all fields!!';
  }
}

// To add actions and activity events to existing tools

function modifyTool(dataFromBody, dataFromURI, done) {
  communityToolService.updateTools(dataFromBody, dataFromURI, done);
}


// To delete an action from a tool

function deleteAction(domainName, done) {
  communityToolService.deleteAction(domainName, done);
}


// To delete an event from a tool

function deleteEvent(domainName, done) {
  communityToolService.deleteEvent(domainName, done);
}

// To delete a tool

function deleteTool(domainName, done) {
  communityToolService.deleteTool(domainName, done);
}

// Exporting the functions to be used in router

module.exports = {
  deleteTool,
  modifyTool,
  getTools,
  postTools,
  deleteEvent,
  deleteAction,
};