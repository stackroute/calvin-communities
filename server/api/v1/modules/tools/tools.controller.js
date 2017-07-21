/* ---------------------CONTROLLER----------------------*/

const ToolService = require('./tools.services'); //

const logger = require('../../../../logger');

const registerPublisherService = require('../../../../common/kafkaPublisher');


function getDomainsAndTools(done) {
  ToolService.getDomainsAndTools(done);
}
// Function for Getting tools

function getTools(domainName, done) {
  ToolService.getTools(domainName, done);
}

// publish event for counter when tool is added
function PublishEventWhenToolAdded(domainname, count,dataFromBody) {
  let message = { domain: domainname, event: 'newtoolsadded', body: count , tools: dataFromBody.toolid };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
       logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

// publish event for counter when tool is added
function PublishEventWhenToolDeleted(domainname, count ,dataFromBody) {
  console.log('hello world');
  let message = { domain: domainname, event: 'removetools', body: count };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      // logger.debug('error occured', err);
    } else {
      // logger.debug('result is', res);
    }
  });
}

// Function for Posting tools

function postTools(dataFromBody, domainName, done) {
  let count = 0;
    if (dataFromBody.toolId && domainName) {
      if (dataFromBody.toolId !== null && domainName !== null) {
    ToolService.addTools(dataFromBody, domainName, done);
    PublishEventWhenToolAdded(domainName, 1,dataFromBody);
    }
}
  // console.log(count === dataFromBody.length);
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
  ToolService.getToolsForDeletion(dataFromURI.toolid, dataFromURI.domainname, (err) => {
    if (!err) {
      console.log('success');
      PublishEventWhenToolDeleted(dataFromURI.domainname, 1);
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
  getDomainsAndTools,
};
