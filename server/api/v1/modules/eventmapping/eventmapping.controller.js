const jwt = require('jsonwebtoken');
const async = require('async');
const _ = require('lodash');
const logger = require('../../../../logger');
const communitytoolsCtrl = require('../communitytools/communitytools.controller');
const eventmappingServices = require('./eventmapping.service');
const token = require('../../../../config').jwtdetails;


const COMMUNITY_TOOL_EVENT_MAP = 'communitytooleventmap';

function authenticate(domain, toolid, done) {
  jwt.sign({domain: domain, toolid: toolid}, token.secret, (err, code) => {
    if(err) { logger.debug(err); return done([400, 'Error in Operation'])}
      if(code) return done(undefined, code);
      })

}

function getToolEventMapping(parameters, done) {
  eventmappingServices.getToolEventMapping(parameters, done);
}

function getToolMapping(parameters, done) {
  eventmappingServices.getToolMapping(parameters, done);
}

function postEventMapping(parameters, details, done) {
  let wrongvalues = 0;
  const queries = [];
  let query;
  details.forEach((data) => {
    if (!_.has(data, 'eventname') || !_.has(data, 'eventdescription') || !_.has(data, 'eventid') ||
      !_.has(data, 'communityactivityevent') || !_.has(data, 'metadata')) {
      wrongvalues++;
    }
    query = 'insert into '+COMMUNITY_TOOL_EVENT_MAP+'(domain, toolid, eventid, eventname, eventdescription, communityactivityevent, metadata) values (?,?,?,?,?,?,?)';

    queries.push({
      query,
      params: [parameters.domain, parameters.toolid, data.eventid,
        data.eventname, data.eventdescription, data.communityactivityevent, data.metadata,
      ],
    });
  });
  if (wrongvalues === 0) {
    async.waterfall([
      eventmappingServices.getToolMapping.bind(null, parameters),
      eventmappingServices.postEventMapping.bind(null, queries),
      authenticate.bind(null, parameters.domain, parameters.toolid, done)
    ], (err, result) => {
      if (err) { logger.error('err', err); return done([400, 'Seems you\'re trying to reintegrate this tool with same domain']); }
      if (result) done(undefined, result);
    });
  } else {
    done([400, 'Required data inputs were not found']);
  }
}
function updateEventMapping(parameters, details, done) {
  let wrongvalues = 0;
  const queries = [];
  let query;
  details.forEach((data) => {
    if (!_.has(data, 'eventname') || !_.has(data, 'eventdescription') || !_.has(data, 'eventid') ||
      !_.has(data, 'communityactivityevent') || !_.has(data, 'metadata')) {
      wrongvalues++;
    }
    query = `update ${COMMUNITY_TOOL_EVENT_MAP} set eventname=?, eventdescription=?, communityactivityevent=? , metadata=? where domain=? and toolid=? and eventid=?`;

    queries.push({ query, params: [data.eventname, data.eventdescription, data.communityactivityevent, data.metadata, parameters.domain, parameters.toolid, data.eventid] });
  });
  if (wrongvalues === 0) {
    async.waterfall([
      eventmappingServices.getToolMapping.bind(null, parameters),
      eventmappingServices.updateEventMapping.bind(null, queries),
      authenticate.bind(null, parameters.domain, parameters.toolid, done)

    ], (err, result) => {
      if (err) { logger.error('err', err); return done([400, 'Unexpected Error, or maybe the tool isn\'t integrated yet']); }
      if (result) return done(undefined, result);
    });
  } else {
    done([400, 'Required data inputs were not found']);
  }
}


module.exports = {
  getToolMapping,
  getToolEventMapping,
  postEventMapping,
  authenticate,
  updateEventMapping,
};

