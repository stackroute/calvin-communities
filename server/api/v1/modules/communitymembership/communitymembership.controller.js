const communityMembershipService = require('./communitymembership.service');

// const communityRoleService = require('../communityrole/communityrole.service');

const logger = require('../../../../logger');

function addMembersToCommunity(domainName, values, done) {
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
            communityMembershipService.addMembersToCommunity(domainName, values, done);
          } else {
            done('Member detail already exist');
          }
        }, 1000);
      } else {
        done('Value of username and role cannot be empty');
      }
    } else {
    // logger.debug('URI parameter cannot be empty.....');
      done('URI parameter cannot be empty.....');
    }
  } else {
    done('Body data cannot be empty');
  }
}


// Remove members from a community

function removeMembersFromCommunity(domainName, values, done) {
  let flag = 0;
  let valueExist = 0;
  if (domainName) {
    values.forEach((data) => {
      if (data.username && data.role) {
        logger.debug('2');
        flag += 1;
      } else {
        flag += 0;
      }
    });
    if (values.length === flag) {
      values.forEach((data) => {
        logger.debug('3');
        communityMembershipService.checkCommunityToUpdateMembersDetail(domainName,
          data.username, data.role, (error, message) => {
            if (message) {
              valueExist += 1;
              // logger.debug(valueExist);
              logger.debug('5');
              // done(null, { message: 'data available' });
            } else {
              valueExist += 0;
              logger.debug('hiiii');
              // done({ error: 'No data to delete' }, undefined);
            }
          });
      });
      setTimeout(() => {
        if (valueExist === values.length) {
          logger.debug('6');
          // logger.debug('hii');
          communityMembershipService.removeMembersFromCommunity(domainName, values, done);
        } else {
          done({ error: 'Member detail already exist' });
        }
      }, 100);
    } else {
      done('Value of username and role cannot be empty');
    }
  } else {
    done('URI parameter cannot be empty.....');
  }
}

// Modify role of a members in a community

/*
function modifyRoleOfMembersFromCommunity(domainName, values, done) {
  let flag = 0;
  let roleExist = 0;
  let valueExist = 0;
  if (domainName) {
    values.forEach((data) => {
      if (data.username && data.role) {
        logger.debug('2');
        flag += 1;
      } else {
        flag += 0;
      }
    });
    if (values.length === flag) {
      values.forEach((data) => {
        logger.debug('3');
        communityRoleService.checkCommunityRole2(domainName, data.role, (error, message) => {
          if (message) {
            logger.debug('3a1');
            roleExist += 1;
            logger.debug(roleExist);
          } else {
            roleExist += 0;
          }
        });
      });
      logger.debug(roleExist,'hii');
      if (values.length === roleExist) {
        logger.debug('3a');
        values.forEach((data) => {
          logger.debug('4');
          communityMembershipService.checkCommunityToUpdateMembersDetail(domainName,
          data.username, data.role, (error, message) => {
            if (message) {
              valueExist += 1;
              // logger.debug(valueExist);
            } else {
              // done(message);

              valueExist += 0;
            }
          });
        });
        setTimeout(() => {
          if (valueExist === values.length) {
            logger.debug('4a1');
            done('Member detail already exist with same role');
          } else{
            logger.debug('4a2');
            communityMembershipService.modifyRoleOfMembersFromCommunity(domainName, values, done);
          }
        }, 1000);
      } else {
        done('This domain doesnot have this role');
      }
    } else {
      done('Value of username and role cannot be empty');
    }
  } else {
    done('URI parameter cannot be empty.....');
  }
}

*/
// get particular Community members Details

function getParticularCommunityMembersDetails(domainName, done) {
  communityMembershipService.getParticularCommunityMembersDetails(domainName, done);
}


// check member availability

function checkCommunityToUpdateMembersDetail(data, done) {
  communityMembershipService.checkCommunityToUpdateMembersDetail(data.domain,
    data.username, data.role, done);
}

module.exports = {
  addMembersToCommunity,
  removeMembersFromCommunity,
  // modifyRoleOfMembersFromCommunity,
  getParticularCommunityMembersDetails,
  checkCommunityToUpdateMembersDetail,
};
