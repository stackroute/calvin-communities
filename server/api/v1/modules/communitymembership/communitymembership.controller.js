const communityMembershipService = require('./communitymembership.service');

const communityRoleCtrl = require('../communityrole/communityrole.controller');

const async = require('async');

const logger = require('../../../../logger');

const registerPublisherService = require('../../../../common/kafkaPublisher');

/*
 *POST and UPDATE Method
 *Condition check for null value of username and role for add and modify member details
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

/*
 *POST and UPDATE Method
 *Condition check for existence of role for a specified domain to add and modify member details
 */

function checkCondtionRoleExistenseForaDomain(roleExistCheck,
  iterateRole, domainName, values, nullCheckResult, done) {
  logger.debug('iam in role check');
  logger.debug('nullCheckResult', nullCheckResult);
  let roleExist = roleExistCheck;
  let iterateRoleExist = iterateRole;
  if (values.length === nullCheckResult) {
    values.forEach((data) => {
      communityRoleCtrl.checkCommunityRole2(domainName, data.role, (error, message) => {
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

/*
 *POST Method - Condition check for data existence to add member details
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

/*
 *POST Method- Publish a event
 */
function publishMessageToTopic(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, value: dataFromBody, type: 'add' ,event:'memberadded'};
  message = JSON.stringify(message);
  logger.debug('membershipService', message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}
// /*
//  *PATCH Method- Publish a event
//  */
function publishMessageToTopicForUpdation(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, value: dataFromBody, type: 'modify',event:'rolemodifiedformember' };
  message = JSON.stringify(message);
  logger.debug('membershipService', message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}


/*
*DELETE Method- Publish a event
*/


function publishMessageToTopicForDeletion(dataFromURI, dataFromBody) {
  let message = { domain: dataFromURI, value: dataFromBody, type: 'deletemember',event:'memberdeleted' };
  logger.debug('membershipService', message);
  message = JSON.stringify(message);
  logger.debug('membershipService', message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

/*
 *POST Method - Condition checked to add members to community
 */

function conditionCheckedAddMembers(domainName, values, dataExistCheckResult, done) {
  logger.debug('condition checked to add member');
  logger.debug('dataExistCheckResult', dataExistCheckResult);
  if (dataExistCheckResult === values.length) {
    communityMembershipService.addMembersToCommunity(domainName, values, (err) => {
      if (err) {
        done(err);
      }
      publishMessageToTopic(domainName, values);
      return done(undefined, { message: 'Member added' });
    });
  } else {
    done({ error: 'Member detail already exist' });
  }
}

/*
 *PATCH Method- Condition check for data existence to update member details
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

/*
 *PATCH Method - Condition checked to update role of a members in a community
 */

function conditionCheckedUpdateMembersRole(domainName, values, dataExistCheckResult, done) {
  logger.debug('condition checked to update member');
  logger.debug('dataExistCheckResult', dataExistCheckResult);
  if (dataExistCheckResult === values.length) {
    communityMembershipService.modifyRoleOfMembersFromCommunity(domainName, values, (err) => {
      if (err) {
        done(err);
      }
      publishMessageToTopicForUpdation(domainName, values);
      return done(undefined, { message: 'Role modified' });
    });
  } else {
    done({ error: 'Member details not available' });
  }
}

/*
 * DELETE Method - Condition check for null value of username to delete member details
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

/*
 *DELETE Method- Condition check for data existence to delete member details
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

/*
 * DELETE Method - Condition checked to delete members in a community
*/

function conditionCheckedDeleteMembers(domainName, values, dataExistCheckResult, done) {
  logger.debug('condition checked to delete member');
  logger.debug('dataExistCheckResult', dataExistCheckResult);
  if (dataExistCheckResult === values.length) {
    communityMembershipService.removeMembersFromCommunity(domainName, values, (err) => {
      if (err) {
        done(err);
      }
      publishMessageToTopicForDeletion(domainName, values);
      return done(undefined, { message: 'Member deleted' });
    });
    // publishMessageToTopicForDeletion(domainName, values);
  } else {
    done({ error: 'Member details not available' });
  }
}

/*
 *POST Method- Add members to the community
 */

function addMembersToCommunity(domainName, values, done) {
  const flag = 0;
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

/*
 *PATCH Method - Modify role of a members in a community
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

/*
 *DELETE Method - Remove members from a community
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

/*
 * GET Method - get the particular Community members Detail
 */

function getParticularCommunityMembersDetails(domainName, done) {
  communityMembershipService.getParticularCommunityMembersDetails(domainName, done);
}

/*
 *Checking condition - get particular Community members Detail to check user availability
 */

function checkCommunityToUpdateMembersDetails(domainName, userName, done) {
  communityMembershipService.checkCommunityToUpdateMembersDetails(domainName, userName, done);
}


module.exports = {
  addMembersToCommunity,
  removeMembersFromCommunity,
  modifyRoleOfMembersFromCommunity,
  getParticularCommunityMembersDetails,
  checkCommunityToUpdateMembersDetails,
};
