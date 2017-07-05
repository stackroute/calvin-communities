const membershipService = require('./membership.service');


/**
 *get community Details of a particular member
 *
 * GET REQUEST
 *
 *
 */

 function getCommunityList(username, done) {
  membershipService.getCommunityList(username, done);
}

  module.exports = {
      getCommunityList,
  };
