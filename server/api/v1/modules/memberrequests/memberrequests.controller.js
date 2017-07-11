const service = require('./memberrequests.service');
const communityRoleService = require('../communityrole/communityrole.service');
const registerPublisherService = require('../../../../common/kafkaPublisher');
const async = require('async');
const logger = require('../../../../logger');

const statusstring = [
  'approved', 'invitesent', 'accepted', 'requested',
];

let status = '';
// Getting the table details for particular domain

function gettingValuesByDomain(domain, done) {
  const domainname = domain.toLowerCase();
  service.gettingValuesByDomain(domainname, done);
}


function publishMessageToTopic4(domain) {
  let message = { domainname: domain };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('topic4', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}


function publishMessageToTopic5(domain) {
  let message = { domainname: domain };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('topic5', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}


// Insert the values into the table for both request and invite

function rolechecking(dataFromBody, dataFromParams, type, iterations, done) {
  let flag2 = 0;
  let iteration = iterations;
  const persons = dataFromBody.invitee;
  if (type !== 'invite' && type !== 'request') {
    done({ error: 'Please enter valid values!!' });
  }
  if (type === 'invite') {
    persons.forEach((b) => {
      if ((b.email !== 'null') && (b.email)) {
        if ((type.toLowerCase() === 'invite' && b.role.toLowerCase() !== '')) {
          communityRoleService.checkCommunityRole2(dataFromParams, b.role, (error, message) => {
            iteration += 1;
            if (message) {
              flag2 += 1;
            } else {
              flag2 += 0;
            }
            if (iteration === persons.length) {
              done(null, flag2);
            }
          });
        } else {
          done({ error: 'Please enter valid values!!' });
        }
      } else {
        done({ error: 'Please enter valid values!!' });
      }
    });
  }

  if (type === 'request') {
    persons.forEach((b) => {
      if ((b.email !== 'null') && (b.email)) {
        if ((type.toLowerCase() === 'request' && b.role.toLowerCase() === '')) {
          flag2 += 1;
        } else {
          flag2 += 0;
        }
      } else {
        done({ error: 'Please enter valid values!!' });
      }
    });
    done(null, flag2);
  }
}

function finalservice(dataFromBody, dataFromParams, type, flag2, done) {
  let flag = false;
  const persons = dataFromBody.invitee;
  if (dataFromParams) {
    if (dataFromParams !== 'null') {
      if ((type.toLowerCase() === 'invite' && dataFromBody.invitedby.length > 0) || (type.toLowerCase() === 'request' && dataFromBody.invitedby === '')) {
        flag = true;
      }
    }
  }
  if ((flag) && (flag2 === persons.length)) {
    if (type === 'invite') { status = 'invitesent'; } else if (type === 'request') { status = 'requested'; }
    service.InsertData(dataFromBody, dataFromParams, status, type, (err) => {
      if (err) {
        done(err);
      }
      if (type === 'invite') {
        publishMessageToTopic4(dataFromParams);
      }
      if (type === 'request') {
        publishMessageToTopic5(dataFromParams);
      }
      return done(undefined, { message: 'Inserted' });
    });
  } else {
    done({ error: 'Please enter valid values!!' }, undefined);
  }
}



function InsertData(dataFromBody, dataFromParams, type, done) {
  const iteration = 0;
  async.waterfall([
    rolechecking.bind(null, dataFromBody, dataFromParams, type, iteration),
    finalservice.bind(null, dataFromBody, dataFromParams, type),

  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}


// Upadate the status for invite

function updateStatusInvite(params, dataFromBody, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  service.gettingValuesByDomainPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      if ((dataFromBody.status) && (dataFromBody.status !== null)) {
        statusstring.forEach((a) => {
          if (dataFromBody.status.includes(a)) {
            flag = true;
          }
        });
      }
    }
    if ((flag) && ((inviteType === 'invite') && (dataFromBody.status === 'accepted'))) {
      service.statusUpdateInvite(domain, person, dataFromBody, done);
    } else done({ error: 'Not updated due to invalid values' }, undefined);
  });
}

// Upadate the status for request


function updatecheckdomain(params, bodyData, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  service.gettingValuesByDomainPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      flag = true;
      done(null, flag, inviteType);
    } else { done({ error: 'Not updated due to invalid values' }, undefined); }
  });
}

function updatecheckrole(params, bodyData, flag, inviteType, done) {
  let flag2 = false;
  const domain = params.domain.toLowerCase();
  communityRoleService.checkCommunityRole2(domain, bodyData.role, (err, message) => {
    if (message) {
      flag2 = true;
    } else {
      flag2 = false;
    }
    done(null, flag, flag2, inviteType);
  });
}


function finalserviceupdate(params, bodyData, flag, flag2, inviteType, done) {
  let flag3 = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  if ((bodyData.status) && (bodyData.status !== null)) {
    statusstring.forEach((a) => {
      if (bodyData.status.includes(a)) {
        flag3 = true;
      }
    });
  }
  if ((flag) && (flag2) && (flag3) && ((inviteType === 'request') && (bodyData.status === 'approved'))) {
    if ((bodyData.invitedby) && (bodyData.invitedby !== 'null') && (bodyData.role) && (bodyData.role !== 'null')) {
      service.statusUpdateRequest(domain, person, bodyData, done);
    } else done({ error: 'Not updated due to invalid values' }, undefined);
  } else done({ error: 'Not updated due to invalid values' }, undefined);
}


function updateStatusRequest(params, bodyData, done) {
  async.waterfall([
    updatecheckdomain.bind(null, params, bodyData),
    updatecheckrole.bind(null, params, bodyData),
    finalserviceupdate.bind(null, params, bodyData),

  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}


// Deleting the row in the table when the request or invite is rejected

function rejectedInviteRequest(domainvalue, personvalue, done) {
  let flag = false;
  const domainname = domainvalue.toLowerCase();
  const personname = personvalue.toLowerCase();
  service.gettingValuesByDomainPerson(domainname, personname, (error, result) => {
    if (error) done({ error: 'Domain not Exists' }, undefined);

    if (result !== undefined && result.length > 0) {
      const checkdomain = result[0].domain;
      const checkperson = result[0].person;
      if (checkdomain === domainname && checkperson === personname) {
        flag = true;
      }
    }

    if (flag) {
      service.rejectedInviteRequest(domainname, personname, done);
    } else {
      done({ error: 'Unable to delete the domain and person' }, undefined);
    }
  });
}


module.exports = {
  gettingValuesByDomain,
  InsertData,
  updateStatusInvite,
  updateStatusRequest,
  rejectedInviteRequest,


};
