/* ---------------------CONTROLLER----------------------*/

const communityToolService = require('./communitytools.services');

const async = require('async');

const toolsService = require('../tools/tools.services');


// Function for Getting tools

function getTools(domainName, done) {
  communityToolService.getTools(domainName, done);
}

// Function for Posting tools

/* function postTools(dataFromBody, done) {
  if (dataFromBody.domain && dataFromBody.id) {
    if (dataFromBody.domain !== null && dataFromBody.id != null) {
    async.parallel([communityToolService.addTools.bind(null, dataFromBody),
    toolsController.modifyTool.bind(null, dataFromBody)],(err,res)=>{
      if(!err){
        return done('Updated');
      }
      return done(err);
    })
    } else {
      done('please fill out all fields!!', undefined);
    }
  } else {
    done('please fill out all fields!!', undefined);
  }
}*/


function postTools(dataFromBody, done) {
  if (dataFromBody) {
    if (dataFromBody != null) {
      async.parallel([
        communityToolService.addTools.bind(null, dataFromBody),
        toolsService.addTools.bind(null, dataFromBody),
      ], (err) => {
        if (err) {
          return done(err);
        }
        return done('Updated');
      });
    } else {
      done('please fill out all fields!!', undefined);
    }
  } else {
    done('please fill out all fields!!', undefined);
  }
}

// To add actions and activity events to existing tools

function modifyTool(dataFromBody, dataFromURI, done) {
  communityToolService.updateTools(dataFromBody, dataFromURI, done);
}

/* // To delete an action from a tool

function deleteAction(domainName, done) {
    communityToolService.deleteAction(domainName, done);
}

// To delete an event from a tool

function deleteEvent(domainName, done) {
    communityToolService.deleteEvent(domainName, done);
}
*/
// To delete a tool

function deleteTool(domain, done) {
  // console.log(domain);
  async.parallel([
    toolsService.deleteTools.bind(null, domain),
    communityToolService.deleteTools.bind(undefined, domain),
  ], (err) => {
    if (err) {
      return done(err);
    }
    return done('Deleted');
  });
}

// Exporting the functions to be used in router

module.exports = {
  deleteTool,
  modifyTool,
  getTools,
  postTools,
    //deleteEvent,
    //deleteAction,
};
