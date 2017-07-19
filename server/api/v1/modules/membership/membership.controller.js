const membershipService = require('./membership.service');

const logger = require('../../../../logger');

const registerPublisherService = require('../../../../common/kafkaPublisher');

const communityService = require('./../community/community.controller');

/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  const arr = [];
  membershipService.getCommunityList(username, (error, results) => {
    if (!error) {
      results.communityDetails.forEach((data) => {
        arr.push(data.domain);
      });
      communityService.getMultipleCommunities(arr, (err, result) => {
        const communities = [];
        if (!err) {
          const iterate = 0;
          results.communityDetails.forEach((data) => {
            result.forEach((values) => {
              if (values.domain === data.domain) {
                iterate +=1;
                communities.push({
                  domain: values.domain, name: values.name, avatar: values.avatar, role: data.role,
                });
                if(iterate = communityDetails.length){
                done(null,communities);
              }
              }
            });
          });
        } else {
          done(err);
        }
       /* const usercommunities = {
          username,
          communities,*/
        });
        //return done(undefined, usercommunities);
    }
  });
}

/*
 * post the community details
 */

function userCommunityDetails(domainName, data, done) {
  let count = 0;
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
      publishMessageforMemberCounter(domainName, count);
      return done(undefined, { message: 'Inserted' });
    });
  } else {
    return done({ error: 'please enter all required fields' }, undefined);
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
  console.log("remove cointroller");
  membershipService.getCommunityList(domainName, (error) => {
    if (!error) {
      // console.log("removed member");
      // console.log(domainName);
      // console.log(data);
      membershipService.removeMemberFromCommunity(domainName, data, (err) => {
        if (err) {
          done(err);
        }
        publishMessageforMemberCounterDecrement(domainName, data.length);
        return done(undefined, { message: 'Deleted' });
      });
    }
    return done({ error: 'Deletion cannot be done for non-existing user' }, undefined);
  });
}


function publishMessageforMemberCounter(domainname, count) {
  let message = { domain: domainname, event: 'newmemberadded', body: count };
  console.log("count", count);
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('CommunityLifecycleEvents', message, (err, res) => {
    if (err) {
      logger.debug('error occured', err);
    } else {
      logger.debug('result is', res);
    }
  });
}

function publishMessageforMemberCounterDecrement(domainname, count) {
  let message = { domain: domainname, event: 'removemember', body: count };
  console.log("count decrement", count);
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
