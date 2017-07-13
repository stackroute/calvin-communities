const membershipService = require('./membership.service');
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
          result.forEach((values) => {
            communities.push({ domain: values.domain, name: values.name, avatar: values.avatar });
          });
        } else {
          done(err);
        }
        const usercommunities = {
          username,
          communities,
        };
        return done(undefined, usercommunities);
      });
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
    membershipService.userCommunityDetails(domainName, data, done);
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
  membershipService.getCommunityList(domainName, (err) => {
    if (!err) {
      return membershipService.removeMemberFromCommunity(domainName, data, done);
    }
    return done({ error: 'Deletion cannot be done for non-existing user' }, undefined);
  });
}

module.exports = {
  getCommunityList,
  // getAvatarForCommunities,
  userCommunityDetails,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,

};
