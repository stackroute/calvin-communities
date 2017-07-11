/* ---------------------CONTROLLER----------------------*/

const ToolService = require('./tools.services'); //

// Function for Getting tools

function getTools(domainName, done) {
  ToolService.getTools(domainName, done);
}

// Function for Posting tools

function postTools(dataFromBody, domainName, done) {
  let count = 0;
  dataFromBody.forEach((data) => {
    if (data.toolId && domainName) {
      if (data.toolId !== null && domainName !== null) {
        count += 1;
      } else {
        count += 0;
      }
    }
  });
 // console.log(count === dataFromBody.length);
  if (count === dataFromBody.length) {
    ToolService.addTools(dataFromBody, domainName, done);
  } else {
    return done({ error: 'please enter all fields' }, undefined);
  }
  return null;
}

function modifyTool(dataFromBody, dataFromparams, done) {
  ToolService.getTools(dataFromparams.domain, (err) => {
    if (!err) {
      return ToolService.updateTools(dataFromBody, dataFromparams, done);
    }
    return done({ error: 'Error Occured' }, undefined);
  });
}

// Function for deleting tools

function deleteTool(dataFromURI, done) {
  ToolService.getToolsForDeletion(dataFromURI.domainname, dataFromURI.toolid, (err) => {
    if (!err) {
      return ToolService.deleteTools(dataFromURI, done);
    }
    return done(err, undefined);
  });
}

// Exporting the functions to be used in router

module.exports = {
  getTools,
  postTools,
  modifyTool,
  deleteTool,
};
