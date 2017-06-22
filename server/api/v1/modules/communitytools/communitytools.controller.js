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

function getActions(dataFromBody, done) {
  communityToolService.getToolsforCRUD(dataFromBody.domain, dataFromBody.tool, done);
}


function postTools(dataFromBody, done) {
  let flag = 0;
  let correctValue = 0;
    // console.log(flag);
  dataFromBody.forEach((data) => {
    if (data.toolId && data.actions && data.domain && data.activityEvents) {
      if (data.toolId !== '' && data.actions !== '' && data.domain !== '' && data.activityEvents !== '') {
        correctValue += 1;
        data.actions=data.actions.map(function(x){ return x.toLowerCase() });
        data.activityEvents=data.activityEvents.map(function(x){ return x.toLowerCase() });
        communityToolService.getToolsforCRUD(data.domain, data.toolId, (error) => {
          if (error) {
            flag += 1;
                        // console.log(flag);
          } else {
            flag += 0;
          }
        });
      }
    }
  });
  setTimeout(() => {
        /* console.log(flag);
         console.log(dataFromBody.length);
         console.log(flag === dataFromBody.length);*/
    if (flag === dataFromBody.length) {
      if (correctValue === dataFromBody.length) {
                // console.log("hii");
        async.parallel([
          communityToolService.addTools.bind(null, dataFromBody),
          toolsService.addTools.bind(null, dataFromBody),
        ], (err) => {
          if (err) {
            return done(err);
          }
          return done(undefined, { message: 'Updated' });
        });
      } else {
        done({ error: 'Tool Exists!!' }, undefined);
      }
    } else {
      done({ error: 'Please enter valid values!!' }, undefined);
    }
  }, 100);
}

// To add actions and activity events to existing tools

function modifyTool(dataFromBody, dataFromURI, done) {
  communityToolService.getToolsforCRUD(dataFromURI.domain, dataFromURI.tool, (err) => {
    if (err) {
      done(err, undefined);
    } else {
      communityToolService.updateTools(dataFromBody, dataFromURI, done);
    }
  });
}

// To delete an action from a tool

function deleteAction(domainName, done) {
  communityToolService.getToolsForDeletion(domainName.domain,
        domainName.tool, domainName.name, (err) => {
          if (err) {
            done(err, undefined);
          } else {
            communityToolService.deleteAction(domainName, done);
          }
        });
}

// To delete an event from a tool

function deleteEvent(domainName, done) {
  communityToolService.getToolsForEventDeletion(domainName.domain,
        domainName.tool, domainName.name, (err) => {
          if (err) {
            done(err, undefined);
          } else {
            communityToolService.deleteEvent(domainName, done);
          }
        });
}

// To delete a tool

function deleteTool(domain, done) {
  communityToolService.getToolsforCRUD(domain.domain, domain.tool, (error) => {
    if (error) {
      done(error, undefined);
    } else {
      async.parallel([
        toolsService.deleteTools.bind(null, domain),
        communityToolService.deleteTools.bind(undefined, domain),
      ], (err) => {
        if (err) {
          return done(err);
        }
        return done(undefined, { message: 'Deleted' });
      });
    }
  });
}

// Exporting the functions to be used in router

module.exports = {
  deleteTool,
  modifyTool,
  getTools,
  postTools,
  deleteEvent,
  deleteAction,
  getActions,
};
