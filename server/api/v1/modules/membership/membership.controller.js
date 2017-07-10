const membershipService = require('./membership.service');

/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  membershipService.getCommunityList(username, done);
}

module.exports = {
  getCommunityList,
};
