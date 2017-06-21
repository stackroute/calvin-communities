/* ---------------------CONTROLLER----------------------*/

const ToolService = require('./tools.services'); //

// Function for Getting tools

function getTools(domainName, done) {
  ToolService.getTools(domainName, done);
}

// Function for Posting tools

function postTools(dataFromBody, done) {
  let count = 0;
  dataFromBody.forEach((data) => {
    if (data.domain && data.toolId) {
      if (data.domain !== null && data.toolId !== null) {
        count += 1;
      } else {
        count += 0;
      }
    }
  });
  if (count === dataFromBody.length) {
    ToolService.addTools(dataFromBody, done);
  } else {
    return done({ error: 'please enter all fields' }, undefined);
  }
  return done();
}

function modifyTool(dataFromBody, dataFromparams, done) {
  ToolService.updateTools(dataFromBody, dataFromparams, done);
}

// Function for deleting tools

function deleteTool(dataFromURI, done) {
  ToolService.deleteTools(dataFromURI, done);
}

// Exporting the functions to be used in router

module.exports = {
  getTools,
  postTools,
  modifyTool,
  deleteTool,
};
