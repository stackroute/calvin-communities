const service = require('./memberrequests.service');
const communityRoleService = require('../communityrole/communityrole.service');
const communityMemberService = require('../communitymembership/communitymembership.service');
const registerPublisherService = require('../../../../common/kafkaPublisher');
const async = require('async');
const logger = require('../../../../logger');

let status = '';

//Getting the table details for particular domain

function gettingValuesByDomain(domain, done) {
  const domainname = domain.toLowerCase();
  service.gettingValuesByDomain(domainname, done);
}

// Publish the event when invite occured
function publishMessageforInvite(domainname,count,dataFromBody) {
  let message = { domain: domainname, event: 'newinvitees', body: count , invitee : dataFromBody.invitee};
  message = JSON.stringify(message);
  logger.debug("publish invite message" , message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

//Publish the event when invite occur
function publishMessageforRequest(domainname, count,dataFromBody) {
  let message = { domain: domainname, event: 'newjoinrequests', body: count , requester : dataFromBody.invitee };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}
// publish event for member when he accepted the invitation or approved the request
function PublishEventForMemberAdded(person, domain, role) {
  let message = { personemail: person, domainname: domain, roleforperson: role, event: 'inviteaccepted' };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

// publish event for counter when rejection of invitation
function PublishEventForRejectionOfInvite(domainname, count) {
  let message = { domain: domainname, event: 'rejectinvitees', body: count };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

// publish event for counter when rejection of request
function PublishEventForRejectionOfRequest(domainname, count) {
  let message = { domain: domainname, event: 'rejectrequests', body: count };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}


// Insert the values into the table for both request and invite

function ConditionForCheckingRole(dataFromBody, dataFromParams, type, iterations, done) {
  logger.debug("role checked");
  let flag2 = 0;
  let iteration = iterations;

  if (type !== 'invite' && type !== 'request') {
    done({ error: 'Please enter valid type values!!' });
  }
  if (type === 'invite') {
    const persons = dataFromBody.invitee;
    logger.debug("invite", persons);
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
          return done({ error: 'Please select role when inviting!!' });
        }
      } else {
        return done({ error: 'Please enter emailid when inviting!!' });
      }
      return null;
    });
  }

  if (type === 'request') {
    if ((dataFromBody.invitee) && (dataFromBody.invitee !== 'null')) {
      flag2 = 1;
      done(null, flag2);
    } else {
      return done({ error: 'Please enter your emailid when requesting!!' });
    }
  }
}

function ConditionForCheckingMember(dataFromBody, dataFromParams, type, flag2, done) {
  let itera = 0;
  let flag3 = 0;
  const persons = dataFromBody.invitee;

  if (type === 'invite') {
    if (flag2 === persons.length) {
      persons.forEach((b) => {
        if ((b.email !== 'null') && (b.email)) {
          communityMemberService.checkCommunityToUpdateMembersDetails(dataFromParams, b.email,
            (error) => {
              itera += 1;
              if (error) {
                flag3 += 1;
              } else {
                flag3 += 0;
              }
              if (itera === persons.length) {
                done(null, flag2, flag3);
              }
            });
        } else {
          return done({ error: 'Please enter valid values!!' });
        }
        return null;
      });
    } else {
      return done({ error: 'Given role is not applicable for particular community!!' });
    }
  }
  if (type === 'request') {
    if ((dataFromBody.invitee) && (dataFromBody.invitee !== 'null')) {
      communityMemberService.checkCommunityToUpdateMembersDetails(dataFromParams,
        dataFromBody.invitee, (error) => {
          if (error) {
            flag3 = 1;
          } else {
            flag3 = 0;
          }
          done(null, flag2, flag3);
        });
    } else {
      done({ error: 'Please enter valid values!!' });
    }
  }
}


function CallingServiceForInsert(dataFromBody, dataFromParams, type, flag2, flag3, done) {
  let flag = false;
  const persons = dataFromBody.invitee;
  if (dataFromParams) {
    if (dataFromParams !== 'null') {
      if ((type.toLowerCase() === 'invite' && dataFromBody.invitedby.length > 0) || (type.toLowerCase() === 'request')) {
        flag = true;
      } else {
        return done({ error: 'Please enter the name who is inviting!!' }, undefined);
      }
    }
  }

  if (type === 'invite') {
    if ((flag) && (flag2 === persons.length) && (flag3 === persons.length)) {
      status = 'invitesent';
      service.InsertDataInvite(dataFromBody, dataFromParams, status, type, (err) => {
        if (err) {
          done(err);
        }
        publishMessageforInvite(dataFromParams, flag2, dataFromBody);
        return done(undefined, { message: 'Inserted' });
      });
    } else {
      return done({ error: 'Member is already in community!!' }, undefined);
    }
  }

  if (type === 'request') {
    if ((flag) && (flag2 === 1) && (flag3 === 1)) {
      status = 'requested';
      service.InsertDataRequest(dataFromBody, dataFromParams, status, type, (err) => {
        if (err) {
          done(err);
        }
        publishMessageforRequest(dataFromParams, flag2,dataFromBody);
        return done(undefined, { message: 'Inserted' });
      });
    } else {
      done({ error: 'Member is already in community!!' }, undefined);
    }
  }
}

function InsertData(dataFromBody, dataFromParams, type, done) {
  logger.debug("invite controller");
  const iteration = 0;
  async.waterfall([
    ConditionForCheckingRole.bind(null, dataFromBody, dataFromParams, type, iteration),
    ConditionForCheckingMember.bind(null, dataFromBody, dataFromParams, type),
    CallingServiceForInsert.bind(null, dataFromBody, dataFromParams, type),
  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}

// Upadate the status for invite

function updateStatusForInvite(params, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  let role = '';
  service.gettingValuesByDomainAndPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      role = result[0].role;
      flag = true;
    }
    if ((flag) && ((inviteType === 'invite'))) {
      status = 'accepted';
      service.updateStatusForInvite(domain, person, status, (err) => {
        if (err) {
          done(err);
        }
        PublishEventForMemberAdded(person, domain, role);
        return done(undefined, { message: 'Updated' });
      });
    } else done({ error: 'Not updated due to invalid values' }, undefined);
  });
}

// Upadate the status for request

function ConditionForCheckDomainAndPerson(params, bodyData, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  service.gettingValuesByDomainAndPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      flag = true;
      done(null, flag, inviteType);
    } else { done({ error: 'Not updated due to invalid values' }, undefined); }
  });
}

function ConditionForCheckRole(params, bodyData, flag, inviteType, done) {
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

function CallingServiceForUpdate(params, bodyData, flag, flag2, inviteType, done) {
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  if ((flag) && (flag2) && (inviteType === 'request')) {
    if ((bodyData.invitedby) && (bodyData.invitedby !== 'null') && (bodyData.role) && (bodyData.role !== 'null')) {
      status = 'approved';
      service.updateStatusForRequest(domain, person, bodyData, status, (err) => {
        if (err) {
          done(err);
        }
        PublishEventForMemberAdded(person, domain, bodyData.role);
        return done(undefined, { message: 'Updated' });
      });
    } else done({ error: 'Not updated due to invalid values' }, undefined);
  } else done({ error: 'Not updated due to invalid values' }, undefined);
}

function updateStatusForRequest(params, bodyData, done) {
  async.waterfall([
    ConditionForCheckDomainAndPerson.bind(null, params, bodyData),
    ConditionForCheckRole.bind(null, params, bodyData),
    CallingServiceForUpdate.bind(null, params, bodyData),

  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}
//Deleting the row in the table when the request or invite is rejected

function rejectedInviteOrRequest(domainvalue, personvalue, done) {
  let flag = false;
  let type = '';
  const domainname = domainvalue.toLowerCase();
  const personname = personvalue.toLowerCase();
  service.gettingValuesByDomainAndPerson(domainname, personname, (error, result) => {
    if (error) done({ error: 'Domain not Exists' }, undefined);
    if (result !== undefined && result.length > 0) {
      const checkdomain = result[0].domain;
      const checkperson = result[0].person;
      type = result[0].type;
      if (checkdomain === domainname && checkperson === personname) {
        flag = true;
      }
    }

    if (flag) {
      const count = 1;
      service.rejectedInviteOrRequest(domainname, personname, (err) => {
        if (err) {
          done(err);
        }
        if (type === 'invite') {
          PublishEventForRejectionOfInvite(domainname, count);
        }
        if (type === 'request') {
          PublishEventForRejectionOfRequest(domainname, count);
        }
        return done(undefined, { message: 'Updated' });
      });
    } else {
      done({ error: 'Unable to delete the domain and person' }, undefined);
    }
  });
}

module.exports = {
  gettingValuesByDomain,
  InsertData,
  updateStatusForInvite,
  updateStatusForRequest,
  rejectedInviteOrRequest,
};
