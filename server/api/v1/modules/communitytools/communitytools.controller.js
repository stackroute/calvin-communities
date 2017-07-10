/* ---------------------CONTROLLER----------------------*/

const communityToolService = require('./communitytools.services');

const async = require('async');

const toolsService = require('../tools/tools.services');

const roleService = require('../communityrole/communityrole.service');

const registerPublisherService = require('../../../../common/kafkaPublisher');

const connectionString = require('../../../../config').topics;

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
  communityToolService.getToolsforCRUD(dataFromBody.domainname, dataFromBody.toolid, done);
}


function postTools(dataFromBody, dataFromURI, done) {
  let flag = 0;
  let correctValue = 0;
  // console.log(flag);
  dataFromBody.forEach((data) => {
    if (data.toolId && data.actions && data.activityEvents) {
      if (data.toolId !== '' && data.actions !== '' && data.activityEvents !== '') {
        correctValue += 1;
        communityToolService.getToolsforCRUD(dataFromURI, data.toolId, (error) => {
          if (error) {
            flag += 1;
          } else {
            flag += 0;
          }
        });
      }
    }
  });
  setTimeout(() => {
    if (flag === dataFromBody.length) {
      if (correctValue === dataFromBody.length) {
        // console.log("hii");
        async.parallel([
          communityToolService.addTools.bind(null, dataFromBody, dataFromURI),
          toolsService.addTools.bind(null, dataFromBody ,dataFromURI), //to be removed by kafka event

        ], (err,result) => {
          if (err) {
            return done(err);
          }
          // console.log('message here');
          publishMessageToTopic(dataFromBody, dataFromURI);
          return done(undefined, result);
        });
      } else {
        done({ error: 'Tool Exists!!' }, undefined);
      }
    } else {
      done({ error: 'Please enter valid values!!' }, undefined);
    }
  }, 200);
}

// To add actions and activity events to existing tools

function modifyTool(dataFromBody, dataFromURI, done) {
  communityToolService.getToolsforCRUD(dataFromURI.domainname, dataFromURI.toolid, (err) => {
    if (err) {
      done(err, undefined);
    } else {
      communityToolService.updateTools(dataFromBody, dataFromURI, done);
    }
  });
}

// To delete an action from a tool

function deleteAction(domainName, done) {
  communityToolService.getToolsForDeletion(domainName.domainname,
    domainName.toolid, domainName.name, (err) => {
      if (err) {
        done(err, undefined);
      } else {
        roleService.communityToolsServiceToDeleteAction(domainName.domainname,
          domainName.toolid, domainName.name, (error, res) => {
            if (error) {
              done(err, undefined);
            } else if (res === 0) {
              communityToolService.deleteAction(domainName, done);
            } else {
              done({ error: 'sorry unable to delete action' }, undefined);
            }
          });
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
  communityToolService.getToolsforCRUD(domain.domainname, domain.toolid, (error) => {
    if (error) {
      done(error, undefined);
    } else {
      roleService.communityToolsServiceToDeleteTool(domain.domainname, domain.toolid,
        (err) => {
          if (err) {
            return done({ error: 'Sorry!!Unable to delete tool!' }, undefined);
          }
          async.parallel([
            toolsService.deleteTools.bind(null, domain),
            communityToolService.deleteTools.bind(undefined, domain),
          ], (erro, result) => {
            if (err) {
              return done(erro);
            }
            return done(undefined, result);
          });
          return null;
        });
    }
  });
}

function publishMessageToTopic(dataFromBody, dataFromURI) {
  // console.log("inside publish");
  let message = { domain: dataFromURI, tools: dataFromBody };
  message = JSON.stringify(message);
  // console.log("sending message",message);
  registerPublisherService.publishToTopic('topic1', message, (err, res) => {
    if (err) {
      console.log('error occured', err);
    } else {
      console.log('result is', res);
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
