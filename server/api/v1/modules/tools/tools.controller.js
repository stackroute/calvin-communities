/* ---------------------CONTROLLER----------------------*/

const ToolService = require('./tools.services'); //

// Function for Getting tools

function getTools(domainName, done) {
  ToolService.getTools(domainName, done);
}

// Function for Posting tools

function postTools(dataFromBody, done) {
  if (dataFromBody.domain && dataFromBody.tools) {
    if (dataFromBody.domain !== null && dataFromBody.tools !== null) {
      ToolService.addTools(dataFromBody, done);
    } else {
      return done('please fill out all fields!!');
    }
  } else {
    return done('please fill out all fields!!');
  }
  return done();
}

function modifyTool(dataFromBody, dataFromURI, done) {
  ToolService.updateTools(dataFromBody, dataFromURI, done);
}

// Function for deleting tools

function deleteTool(dataFromURI, done) {
  ToolService.deleteTool(dataFromURI, done);
}

// Exporting the functions to be used in router

module.exports = {
  getTools,
  postTools,
  modifyTool,
  deleteTool,
};
