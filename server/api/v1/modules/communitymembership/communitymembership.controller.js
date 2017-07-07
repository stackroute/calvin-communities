const communityMembershipService = require('./communitymembership.service');

const membershipService = require('../membership/membership.service');

const communityRoleService = require('../communityrole/communityrole.service');

const async = require('async');

const logger = require('../../../../logger');


/**
 *Add memebers to the community
 *
 * POST REQUEST
 *
 *
 */

function addMembersToCommunity(domainName, values, done) {
  // logger.debug('hi u r adding a new member');
  let flag = 0;
  let valueExist = 0;
  if (values.length > 0) {
    if (domainName) {
      values.forEach((data) => {
        if (data.username && data.role) {
          flag += 1;
        } else {
          flag += 0;
        }
      });
      if (values.length === flag) {
        values.forEach((data) => {
          communityMembershipService.checkCommunityToUpdateMembersDetail(domainName,
           data.username, data.role, (error) => {
             if (error) {
               valueExist += 1;
             } else {
               valueExist += 0;
             }
           });
        });
        setTimeout(() => {
          if (valueExist === values.length) {
            async.parallel([
              communityMembershipService.addMembersToCommunity.bind(null, domainName, values, done),
              membershipService.addMemberToCommunity.bind(null, domainName, values, done),
            ]);
          } else {
            done({ error: 'Member detail already exist' });
          }
        }, 100);
      } else {
        done({ error: 'Value of username and role cannot be empty' });
      }
    } else {
    // logger.debug('URI parameter cannot be empty.....');
      done({ error: 'URI parameter cannot be empty.....' });
    }
  } else {
    done({ error: 'Body data cannot be empty' });
  }
}

/**
 *Remove members from a community
 *
 * DELETE REQUEST
 *
 *
 */

function removeMembersFromCommunity(domainName, values, done) {
  let flag = 0;
  let valueExist = 0;
  if (values.length > 0) {
    if (domainName) {
      values.forEach((data) => {
        if (data.username && data.role) {
          flag += 1;
        } else {
          flag += 0;
        }
      });
      if (values.length === flag) {
        values.forEach((data) => {
          communityMembershipService.checkCommunityToUpdateMembersDetail(domainName,
          data.username, data.role, (error, message) => {
            if (message) {
              valueExist += 1;
            } else {
              valueExist += 0;
            }
          });
        });
        setTimeout(() => {
          if (valueExist === values.length) {
            logger.debug('check details');
            async.parallel([
              communityMembershipService.removeMembersFromCommunity.bind(null,
               domainName, values, done),
              membershipService.removeMemberFromCommunity.bind(null,
               domainName, values, done),
            ]);
          } else {
            done({ error: 'Member details not available' });
          }
        }, 100);
      } else {
        done({ error: 'Value of username and role cannot be empty' });
      }
    } else {
      done({ error: 'URI parameter cannot be empty.....' });
    }
  } else {
    done({ error: 'Body data cannot be empty' });
  }
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


/**
 *Modify role of a members in a community
 *
 * PATCH REQUEST
 *
 *
 */

function modifyRoleOfMembersFromCommunity(domainName, values, done) {
  let flag = 0;
  let roleExist = 0;
  let valueExist = values.length;
  let dataExist = 0;
  if (values.length > 0) {
    if (domainName) {
      values.forEach((data) => {
        if (data.username && data.role) {
          flag += 1;
        } else {
          flag += 0;
        }
      });
      if (values.length === flag) {
        values.forEach((data) => {
          communityRoleService.checkCommunityRole2(domainName, data.role, (error, message) => {
            if (message) {
              roleExist += 1;
            } else {
              roleExist += 0;
            }
          });
        });
        setTimeout(() => {
          if (roleExist === values.length) {
            values.forEach((data) => {
              communityMembershipService.checkCommunityToUpdateMembersDetail(domainName,
              data.username, data.role, (error, message) => {
                if (message) {
                  valueExist += 1;
                } else {
                  valueExist -= 1;
                }
              });
            }); setTimeout(() => {
              if (valueExist === 0) {
                values.forEach((data) => {
                  communityMembershipService.checkCommunityToUpdateMembersDetails(domainName,
                 data.username, (error, message) => {
                   if (message) {
                     dataExist += 1;
                   } else {
                     dataExist += 0;
                   }
                 });
                });
                setTimeout(() => {
                  if (dataExist === values.length) {
                    async.parallel([
                      communityMembershipService.modifyRoleOfMembersFromCommunity.bind(null,
                     domainName, values, done),
                      membershipService.modifyRoleOfMemberFromCommunity.bind(null,
                     domainName, values, done),
                    ]);
                  } else {
                    done({ error: 'Data not exist' });
                  }
                }, 100);
              } else {
                done({ error: 'Same data Exist' });
              }
            }, 100);
          } else {
            done({ error: 'Given role is not available for this community' });
          }
        }, 100);
      } else {
        done({ error: 'Value of username and role cannot be empty' });
      }
    } else {
      done({ error: 'URI param cannot be empty' });
    }
  } else {
    done({ error: 'Body data cannot be empty' });
  }
}
module.exports = {
  addMembersToCommunity,
  removeMembersFromCommunity,
  modifyRoleOfMembersFromCommunity,
  getParticularCommunityMembersDetails,
};
