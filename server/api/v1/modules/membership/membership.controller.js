const membershipService = require('./membership.service');

const logger = require('../../../../logger');

const registerPublisherService = require('../../../../common/kafkaPublisher');

const communityService = require('./../community/community.controller');

const async = require('async');

function memberCommunityList(username, done) {
  logger.debug('memberlist');
  logger.debug('memberList', username);
  membershipService.getCommunityList(username, (error, results) => {
    if (!error) {
      return done(null, results);
    }
    return done(error);
  });
}

function getAvatarDetails(arr, done) {
  logger.debug('ArrayDetails', arr);
  const domains = [];
  const communities = [];
  arr.communityDetails.forEach((data) => {
    domains.push(data.domain);
  });
  communityService.getMultipleCommunities(domains, (err, results) => {
    // logger.debug("communitiesresults", results);
    logger.debug('arrayresults', arr);
    if (!err) {
      arr.communityDetails.forEach((data) => {
        results.forEach((values) => {
          if (values.domain === data.domain) {
            communities.push({
              domain: values.domain,
              avatar: values.avatar,
              roles: data.role,
            });
          }
        });
      });
      const usercommunities = {
        username: arr.username,
        communities,
      };
      logger.debug('communities', usercommunities);
      return done(null, usercommunities);
    }
  });
}
/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  async.waterfall([
    memberCommunityList.bind(null, username),
    getAvatarDetails.bind(null),
  ], (err, results) => {
    if (err) {
      return done(err);
    }
    return done(undefined, results);
  });
}

/*
 * post the community details
 */

function userCommunityDetails(domainName, data, done) {
  logger.debug('user communities here');
  let count = 0;
  if (data) {
    data.forEach((values) => {
      if (domainName && values.username && values.role) {
        if (domainName !== null && values.username !== null && values.role !== null) {
          count += 1;
        } else {
          count += 0;
        }
      }
    });
    if (count === data.length) {
      membershipService.userCommunityDetails(domainName, data, (err) => {
        if (err) {
          done(err);
        }
        logger.debug('BEFORE GOING SOMEWHERE');
        return done(undefined, { message: 'Inserted' });
      });
    } else {
      return done({ error: 'please enter all required fields' }, undefined);
    }
  }
  return null;
}

/*
 * Modify role of a member in a community
 */
function modifyRoleOfMemberInCommunity(domainName, data, done) {
  membershipService.getCommunityList(domainName, (err) => {
    if (!err) {
      return membershipService.modifyRoleOfMemberInCommunity(domainName, data, done);
    }
    return done({ error: 'Modification cannot be done for the non-existing user' }, undefined);
  });
}


function publishMessageforMemberCounterDecrement(domainname, count, data) {
  let message = {
    domain: domainname, event: 'removemembers', body: count, members: data,
  };
  logger.debug('count decrement', count);
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}


/*
 * Remove member from the community
 */

function removeMemberFromCommunity(domainName, data, done) {
  logger.debug('remove cointroller');
  membershipService.getCommunityList(domainName, (error) => {
    if (!error) {
      // logger.debug("removed member");
      // logger.debug(domainName);
      // logger.debug(data);
      membershipService.removeMemberFromCommunity(domainName, data, (err) => {
        if (err) {
          done(err);
        }
        publishMessageforMemberCounterDecrement(domainName, data.length, data);
        return done(undefined, { message: 'Deleted' });
      });
    }
    return done({ error: 'Deletion cannot be done for non-existing user' }, undefined);
  });
}


/* function publishMessageforMemberCounter(domainname, count,data) {
  logger.debug('reached SOME PLACE')
  logger.debug("------->", data);
  let newData = [];
  data.forEach((db) => {
    newData.push({member: db.username, role: db.role});
  })

  let message = {
  domain: domainname,
  event: 'newmembersadded', body: count , members: newData, ts: Date.now()};
  logger.debug('count', count);
  message = JSON.stringify(message);
  logger.debug(message,"<-----------")
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
} */


module.exports = {
  getCommunityList,
  userCommunityDetails,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,

};
