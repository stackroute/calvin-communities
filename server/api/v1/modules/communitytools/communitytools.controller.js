/* ---------------------CONTROLLER----------------------*/

const communityToolService = require('./communitytools.services');
const _ = require('lodash');
const async = require('async');
const toolmappingcontroller = require('../communitytoolmapping/communitytoolmapping.controller');
const registerPublisherService = require('../../../../common/kafkaPublisher');
const logger = require('../../../../logger');

function publishtools(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, tools: dataFromBody, type: 'addtool' };
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

function mergeData(data, previousResult, done) { // eslint-disable-line consistent-return
  if (previousResult.length === 0) {
    return done(undefined, []);
  }
  toolmappingcontroller.getToolMapping(data,
   (err, res) => { // eslint-disable-line consistent-return
     if (err) { logger.debug('Unexpected Error', err); return done([500, 'Internal Server Error']); }
     const result = res;
     if (result) {
       result.toolname = previousResult[0].toolname;
       result.avatar = previousResult[0].avatar;
       result.toolurl = previousResult[0].toolurl;
       result.actions = previousResult[0].actions;
       result.updatedon = previousResult[0].updatedon;
       return done(undefined, result);
     }
   });
}

function getCommunityTool(data, done) {
  async.waterfall([
    communityToolService.getCommunityTool.bind(null, data.domain, data.toolid),
    mergeData.bind(null, data),
  ], (err, res) => {
    if (err) { logger.debug('Unexpected Error', err); return done(err); }
    return done(undefined, res);
  });
}

function postCommunityTool(body, done) { // eslint-disable-line consistent-return
  if (_.isEmpty(body.toolname) ||  _.isEmpty(body.toolurl) || _.isEmpty(body.purpose) ||
    !_.has(body, 'toolname') || !_.has(body, 'avatar') || !_.has(body, 'toolurl') || !_.has(body, 'purpose') ||
    !_.has(body, 'actions') || !_.has(body, 'domain') || !_.has(body, 'toolId')) {
    return done([400, 'Required Data Not Provided']);
  }

  communityToolService.getCommunityTool(body.domain, body.toolId,
   (err, res) => { // eslint-disable-line consistent-return
     if (err) {
       logger.debug('error occurred', err);
       return done([500, 'Internal Server Error']);
     }

     if (res.length !== 0) {
       logger.debug('domain and tool are already integrated', res);
       return done([400, 'Domain & Tool are already Integrated']);
     }

     const toolDetails = [body.domain, body.toolId, body.toolname,
       body.avatar, body.purpose, body.toolurl, body.actions];
     async.series([
       communityToolService.addTools.bind(null, toolDetails),
       toolmappingcontroller.postEventMapping.bind(null,
        { domain: body.domain, toolid: body.toolId },
       body),
     ], (error, result) => {
       if (error) {
         logger.debug('an error occured', error);
         return done([500, error[1]]);
       }
       publishtools(body.domain, {toolId: body.toolId, avatar: body.avatar, toolName: body.toolname});
       return done(undefined, result[1]);
     });
   });
}


function updateTool(parameters, body, done) {
  if (!_.has(body, 'toolname') || !_.has(body, 'avatar') || !_.has(body, 'toolurl') || !_.has(body, 'purpose') ||
    !_.has(body, 'actions') || !_.has(parameters, 'domain') || !_.has(parameters, 'toolid') || !_.has(body, 'events')) {
    done([400, 'Required Data Not Pushed']);
  }

 communityToolService.getCommunityTool(parameters.domain, parameters.toolid, (err, res) => {
  if(err) {logger.debug(err); return done([500, 'Internal Server Error'])};
  if(res.length !== 0) {
  const data = [body.toolname, body.avatar, body.toolurl, body.actions,
    body.purpose, parameters.domain, parameters.toolid];
  async.parallel([
    communityToolService.updateTool.bind(null, data),
    toolmappingcontroller.updateEventMapping.bind(null, parameters, body),
  ], (error, result) => {
    if (error) { return done([500, 'Internal Error Occured']); }
    return done(undefined, result[1]);
  });
}
if(res.length === 0) { return done([400, 'Tool not mapped to this Domain'])}
});
}

// Exporting the functions to be used in router

module.exports = {
  updateTool,
  getTools,
  getCommunityTool,
  postCommunityTool,
};
