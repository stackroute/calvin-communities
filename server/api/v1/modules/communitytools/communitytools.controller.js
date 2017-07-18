/* ---------------------CONTROLLER----------------------*/

const communityToolService = require('./communitytools.services');

const async = require('async');

// const toolsService = require('../tools/tools.services');

const roleService = require('../communityrole/communityrole.service');

const toolmappingcontroller = require('../communitytoolmapping/communitytoolmapping.controller')

const registerPublisherService = require('../../../../common/kafkaPublisher');

const logger = require('../../../../logger');

function publishMessageToTopic(dataFromBody, dataFromURI) {
  // console.log('inside publish');
  let message = { domain: dataFromURI, tools: dataFromBody, type: 'add' };
  message = JSON.stringify(message);
  // console.log("sending message",message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else if (res) {
      logger.debug('result is', res);
    }
  });
}

function publishMessageToTopics(domainAndTool) {
  let message = { domain: domainAndTool, type: 'delete' };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else if (res) {
      logger.debug('result is', res);
    }
  });
}
// Function for Getting tools

function getTools(domainName, done) {
  communityToolService.getTools(domainName, done);
}

function getActions(dataFromBody, done) {
  communityToolService.getToolsforCRUD(dataFromBody.domainname, dataFromBody.toolid, done);
}


function checkTool(dataFromBody, dataFromURI, done) {
  let flag = 0;
  let iterations = 0;
  // console.log(flag);
  dataFromBody.forEach((data) => {
    if (data.toolId && data.actions &&
      data.avatar && data.toolname && data.purpose) {

      if (data.toolId !== '' && data.actions !== '' && data.avatar !== '' && data.toolname !== '' && data.purpose !== '') {
        communityToolService.getToolsforCRUD(dataFromURI, data.toolId, (error) => {
          iterations += 1;
          if (error) {
            flag += 1;
          } else {
            flag += 0;
          }
          if (iterations === dataFromBody.length) {
            logger.debug('iterations', iterations);
            logger.debug('count', flag);
            done(null, flag);
          }
        });
      }
    } else {
      done({ error: 'please fill out all values' });
    }
  });
}

function postTools(dataFromBody, dataFromURI, flag, done) {
  if (flag === dataFromBody.length) {
    // console.log("hii");
    async.parallel([
      communityToolService.addTools.bind(null, dataFromBody, dataFromURI),
      // toolsService.addTools.bind(null, dataFromBody, dataFromURI), //to be removed by kafka event

    ], (err, result) => {
      if (err) {
        return done(err);
      }
      // console.log('message here');
      publishMessageToTopic(dataFromBody, dataFromURI);
      return done(undefined, result);
    });
  } else {
    done({ error: 'Please enter valid values!!' });
  }
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

function postCommunityTools(parameters, body, done) {

  if (!_.has(body, 'toolname') || !_.has(body, 'avatar') || !_.has(body, 'toolurl') || !_.has(body, 'purpose') ||
      !_.has(body, 'actions') || !_.has(parameters, 'domain') || !_.has(parameters, 'toolid') ) {
    done([400, 'Required Data Not Pushed']);
  }

  const toolDetails = [parameters.domain, parameters.toolid, body.toolname, body.avatar,body.purpose, body.toolurl, body.actions];
  async.series([
    communityToolService.addTools.bind(null, toolDetails),
    toolmappingcontroller.postEventMapping.bind(null, parameters, body)
    ], (error, result) => {
    if(error) {
      logger.debug('an error occured', error);
      return done([500, 'Internal server Error']);
    }
    return done(undefined, result[1]);
  })

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
  // console.log('n delete');
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
            // toolsService.deleteTools.bind(null, domain),
            communityToolService.deleteTools.bind(undefined, domain),
          ], (erro, result) => {
            if (erro) {
              return done(erro);
            }
            publishMessageToTopics(domain);
            return done(undefined, result);
          });
          return null;
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
  postCommunityTools,
};
