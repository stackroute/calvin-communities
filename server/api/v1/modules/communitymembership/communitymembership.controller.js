const communityMembershipService = require('./communitymembership.service');

// const membershipService = require('../membership/membership.service');

const communityRoleService = require('../communityrole/communityrole.service');

const async = require('async');

const logger = require('../../../../logger');

const registerPublisherService = require('../../../../common/kafkaPublisher');

/**
 *Condition check for null value of username and role for add and modify member details
 *
 * POST and UPDATE REQUEST
 *
 *
 */

function checkConditionForNull(flagged, domainName, values, done) {
  logger.debug('iam in Null check');
  let flag = flagged;
  if (values.length > 0) {
    if (domainName) {
      values.forEach((data) => {
        if (data.username && data.role) {
          flag += 1;
        } else {
          flag += 0;
        }
      });
      logger.debug('flag', flag);
      done(null, flag);
    } else {
      done({ error: 'URI parameter cannot be empty.....' });
    }
  } else {
    done({ error: 'Body data cannot be empty' });
  }
}

/**
 *Condition check for existence of role for a specified domain to add and modify member details
 *
 * POST and UPDATE REQUEST
 *
 *
 */

function checkCondtionRoleExistenseForaDomain(roleExistCheck,
  iterateRole, domainName, values, nullCheckResult, done) {
  logger.debug('iam in role check');
  logger.debug('nullCheckResult', nullCheckResult);
  let roleExist = roleExistCheck;
  let iterateRoleExist = iterateRole;
  if (values.length === nullCheckResult) {
    values.forEach((data) => {
      communityRoleService.checkCommunityRole2(domainName, data.role, (error, message) => {
        iterateRoleExist += 1;
        if (message) {
          roleExist += 1;
        } else {
          roleExist += 0;
        }
        if (values.length === iterateRoleExist) {
          logger.debug('iterateRoleExist', iterateRoleExist);
          logger.debug('roleExist', roleExist);
          done(null, roleExist);
        }
      });
    });
  } else {
    done({ error: 'Value of username and role cannot be empty' });
  }
}
/**
 *Condition check for data existence to add member details
 *
 * POST REQUEST
 *
 *
 */

function checkCondtionDataExistenseInDataBaseToAddMembers(dataExistCheck,
  iterateData, domainName, values, roleExistCheckResult, done) {
  logger.debug('iam in dataExist check to add member');
  logger.debug('roleExistCheckResult', roleExistCheckResult);
  let iterateDataExist = iterateData;
  let dataExist = dataExistCheck;
  if (roleExistCheckResult === values.length) {
    values.forEach((data) => {
      communityMembershipService.checkCommunityToUpdateMembersDetails(domainName,
        data.username, (error) => {
          iterateDataExist += 1;
          if (error) {
            dataExist += 1;
          } else {
            dataExist += 0;
          }
          if (iterateDataExist === values.length) {
            logger.debug('iterateDataExist', iterateDataExist);
            logger.debug('dataExist', dataExist);
            done(null, dataExist);
          }
        });
    });
  } else {
    done({ error: 'Specified role is not available for this community' });
  }
}

/**
 *Publish a event
 *
 * POST REQUEST
 *
 *
 */

function publishMessageToTopic(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, value: dataFromBody, type: 'add' };

  // let message = {dataFromURI, dataFromBody};
  logger.debug('membershipService', message);
  message = JSON.stringify(message);
  logger.debug('membershipService', message);
  registerPublisherService.publishToTopic('topic3', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

function publishMessageToTopic(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, value: dataFromBody, type: 'modify' };

  // let message = {dataFromURI, dataFromBody};
  logger.debug('membershipService', message);
  message = JSON.stringify(message);
  logger.debug('membershipService', message);
  registerPublisherService.publishToTopic('topic3', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

function publishMessageToTopic(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, value: dataFromBody, type: 'delete' };

  // let message = {dataFromURI, dataFromBody};
  logger.debug('membershipService', message);
  message = JSON.stringify(message);
  logger.debug('membershipService', message);
  registerPublisherService.publishToTopic('topic3', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}


/**
 *Condition checked to add members to community
 *
 * POST REQUEST
 *
 *
 */
function conditionCheckedAddMembers(domainName, values, dataExistCheckResult, done) {
  logger.debug('condition checked to add member');
  logger.debug('dataExistCheckResult', dataExistCheckResult);
  if (dataExistCheckResult === values.length) {
    communityMembershipService.addMembersToCommunity(domainName, values, done);
    publishMessageToTopic(domainName, values);
  } else {
    done({ error: 'Member detail already exist' });
  }
}
/**
 *Condition check for data existence to update member details
 *
 * PATCH REQUEST
 *
 *
 */

function checkCondtionDataExistenseInDataBaseToUpdate(dataExistCheck,
  iterateData, domainName, values, roleExistCheckResult, done) {
  let iterateDataExist = iterateData;
  logger.debug('iam in dataExist check to update member');
  logger.debug('roleExistCheckResult', roleExistCheckResult);
  let dataExist = dataExistCheck;
  if (roleExistCheckResult === values.length) {
    values.forEach((data) => {
      communityMembershipService.checkCommunityToUpdateMembersDetails(domainName,
        data.username, (error, message) => {
          iterateDataExist += 1;
          if (message) {
            dataExist += 1;
          } else {
            dataExist += 0;
          }
          if (iterateDataExist === values.length) {
            logger.debug('iterateDataExist', iterateDataExist);
            logger.debug('dataExist', dataExist);
            done(null, dataExist);
          }
        });
    });
  } else {
    done({ error: 'Specified role is not available for this community' });
  }
}
/**
 *Condition checked to update role of a members in a community
 *
 * PATCH REQUEST
 *
 *
 */
function conditionCheckedUpdateMembersRole(domainName, values, dataExistCheckResult, done) {
  logger.debug('condition checked to update member');
  logger.debug('dataExistCheckResult', dataExistCheckResult);
  if (dataExistCheckResult === values.length) {
    communityMembershipService.modifyRoleOfMembersFromCommunity(domainName, values, done);
    publishMessageToTopic(domainName, values);
  } else {
    done({ error: 'Member details not available' });
  }
}

/**
 *Condition check for null value of username to delete member details
 *
 * DELETE REQUEST
 *
 *
 */
function checkConditionForNullToDelete(flagged, domainName, values, done) {
  logger.debug('iam in Null check');
  let flag = flagged;
  if (values.length > 0) {
    if (domainName) {
      values.forEach((data) => {
        if (data.username) {
          flag += 1;
        } else {
          flag += 0;
        }
      });
      logger.debug('flag', flag);
      done(null, flag);
    } else {
      done({ error: 'URI parameter cannot be empty.....' });
    }
  } else {
    done({ error: 'Body data cannot be empty' });
  }
}
/**
 *Condition check for data existence to delete member details
 *
 * DELETE REQUEST
 *
 *
 */
function checkCondtionDataExistenseInDataBaseToDeleteMembers(dataExistCheck,
  iterateData, domainName, values, nullCheckResult, done) {
  logger.debug('hi iam checking dataExist to delete member');
  logger.debug('nullCheckResult', nullCheckResult);
  let dataExist = dataExistCheck;
  let iterateDataExist = iterateData;
  if (nullCheckResult === values.length) {
    values.forEach((data) => {
      communityMembershipService.checkCommunityToUpdateMembersDetails(domainName,
        data.username, (error, message) => {
          iterateDataExist += 1;
          if (message) {
            dataExist += 1;
          } else {
            dataExist += 0;
          }
          if (iterateDataExist === values.length) {
            logger.debug('iterateDataExist', iterateDataExist);
            logger.debug('dataExist', dataExist);
            done(null, dataExist);
          }
        });
    });
  } else {
    done({ error: 'Value of username cannot be empty' });
  }
}
/**
 *Condition checked to delete members in a community
 * DELETE REQUEST
 *
 *
 */
function conditionCheckedDeleteMembers(domainName, values, dataExistCheckResult, done) {
  logger.debug('condition checked to delete member');
  logger.debug('dataExistCheckResult', dataExistCheckResult);
  if (dataExistCheckResult === values.length) {
    communityMembershipService.removeMembersFromCommunity(domainName, values, done);
    publishMessageToTopic(domainName, values);
  } else {
    done({ error: 'Member details not available' });
  }
}


/**
 *Add members to the community
 *
 * POST REQUEST
 *
 *
 */


function addMembersToCommunity(domainName, values, done) {
  const flag = 0; /* eslint-disable no-param-reassign*/
  const roleExist = 0;
  const iterateRoleExist = 0;
  const dataExist = 0;
  const iterateDataExist = 0;
  async.waterfall([
    checkConditionForNull.bind(null, flag, domainName, values),
    checkCondtionRoleExistenseForaDomain.bind(null,
      roleExist, iterateRoleExist, domainName, values),
    checkCondtionDataExistenseInDataBaseToAddMembers.bind(null,
      dataExist, iterateDataExist, domainName, values),
    conditionCheckedAddMembers.bind(null, domainName, values),
  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}


/**
 *Modify role of a members in a community
 *
 * PATCH REQUEST
 *
 *
 */

function modifyRoleOfMembersFromCommunity(domainName, values, done) {
  const flag = 0;
  const roleExist = 0;
  const iterateRoleExist = 0;
  const dataExist = 0;
  const iterateDataExist = 0;
  async.waterfall([
    checkConditionForNull.bind(null, flag, domainName, values),
    checkCondtionRoleExistenseForaDomain.bind(null,
      roleExist, iterateRoleExist, domainName, values),
    checkCondtionDataExistenseInDataBaseToUpdate.bind(null,
      dataExist, iterateDataExist, domainName, values),
    conditionCheckedUpdateMembersRole.bind(null, domainName, values),
  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}

/**
 *Remove members from a community
 *
 * DELETE REQUEST
 *
 *
 */

function removeMembersFromCommunity(domainName, values, done) {
  const flag = 0;
  const dataExist = 0;
  const iterateDataExist = 0;
  async.waterfall([
    checkConditionForNullToDelete.bind(null, flag, domainName, values),
    checkCondtionDataExistenseInDataBaseToDeleteMembers.bind(null,
      dataExist, iterateDataExist, domainName, values),
    conditionCheckedDeleteMembers.bind(null, domainName, values),
  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}

/**
 *get particular Community members Detail
 *
 * GET REQUEST
 *
 *
 */

function getParticularCommunityMembersDetails(domainName, done) {
  communityMembershipService.getParticularCommunityMembersDetails(domainName, done);
}


module.exports = {
  addMembersToCommunity,
  removeMembersFromCommunity,
  modifyRoleOfMembersFromCommunity,
  getParticularCommunityMembersDetails,
};
