const membershipService = require('./membership.service');

/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  membershipService.getCommunityList(username, done);
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
  // membershipService.userCommunityDetails(domainName, data, done);
  return null;
}

/*
 * Modify role of a member in a community
 */
function modifyRoleOfMemberInCommunity(domainName, data, done) {
  membershipService.getDetailsForDeletionAndUpdation(domainName, data, (err) => {
    if (!err) {
      return membershipService.modifyRoleOfMemberInCommunity(domainName, data, done);
    }
    return done({ error: 'Error Occured' }, undefined);
  });
  // membershipService.modifyRoleOfMemberInCommunity(domainName, data, done);
}

/*
 * Remove member from the community
 */

function removeMemberFromCommunity(domainName, data, done) {
  membershipService.getDetailsForDeletionAndUpdation(domainName, data, (err) => {
    if (!err) {
      membershipService.removeMemberFromCommunity(domainName, data, done);
    }
    return done({ error: 'Error Occured' }, undefined);
  });
  // membershipService.removeMemberFromCommunity(domainName, data, done);
}

module.exports = {
  getCommunityList,
  userCommunityDetails,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,
};
