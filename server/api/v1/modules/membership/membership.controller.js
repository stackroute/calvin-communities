const membershipService = require('./membership.service');

const logger = require('../../../../logger');

const registerPublisherService = require('../../../../common/kafkaPublisher');

const communityService = require('./../community/community.controller');

const async = require('async');
/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  async.waterfall([
    memberCommunityList.bind(null, username),
    getAvatarDetails.bind(null)
  ], (err, results) => {
    if (err) {
      return done(err);
    } else {
      return done(undefined, results);
    }
  });
}

function memberCommunityList(username, done) {
  logger.debug("memberlist");
  const arr = [];
  logger.debug("memberList", username);
  membershipService.getCommunityList(username, (error, results) => {
    if (!error) {
      return done(null, results);
    } else {
      return done(err);
    }
  });
}


function getAvatarDetails(arr, done) {
  logger.debug("ArrayDetails", arr);
  const domains = [];
  const communities = [];
  arr.communityDetails.forEach((data) => {
    domains.push(data.domain);
  })
  communityService.getMultipleCommunities(domains, (err, results) => {
    // logger.debug("communitiesresults", results);
    logger.debug("arrayresults", arr);
    if (!err) {
      arr.communityDetails.forEach((data) => {
        results.forEach((values) => {
          if (values.domain === data.domain) {
            communities.push({
              domain: values.domain,
              avatar: values.avatar,
              roles: data.role
            });
          }
        });

      });
      const usercommunities = {
        username: arr.username,
        communities: communities,
      }
      logger.debug("communities", usercommunities);
      return done(null, usercommunities);
    }
  });
}


/*
 * post the community details
 */

function userCommunityDetails(domainName, data, done) {
  console.log('user communities here')
  let count = 0;
  if(data) {
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
      console.log("BEFORE GOING SOMEWHERE")
      publishMessageforMemberCounter(domainName, count,data);
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

/*
 * Remove member from the community
 */

function removeMemberFromCommunity(domainName, data, done) {
  console.log('remove cointroller');
  membershipService.getCommunityList(domainName, (error) => {
    if (!error) {
      // console.log("removed member");
      // console.log(domainName);
      // console.log(data);
      membershipService.removeMemberFromCommunity(domainName, data, (err) => {
        if (err) {
          done(err);
        }
        publishMessageforMemberCounterDecrement(domainName, data.length,data);
        return done(undefined, { message: 'Deleted' });
      });
    }
    return done({ error: 'Deletion cannot be done for non-existing user' }, undefined);
  });
}


function publishMessageforMemberCounter(domainname, count,data) {
  console.log('reached SOME PLACE')
  console.log("------->", data);
  let newData = [];
  data.forEach((db) => {
    newData.push({member: db.username, role: db.role});
  })

  let message = { domain: domainname, event: 'newmembersadded', body: count , members: newData, ts: Date.now()};
  console.log('count', count);
  message = JSON.stringify(message);
  console.log(message,"<-----------")
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

function publishMessageforMemberCounterDecrement(domainname, count ,data) {
  let message = { domain: domainname, event: 'removemembers', body: count , members : data};
  console.log('count decrement', count);
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

module.exports = {
  getCommunityList,
  userCommunityDetails,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,

};
