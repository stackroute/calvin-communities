const communityMembershipService = require('./communitymembership.service');


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
          communityMembershipService.checkCommunityToUpdateMembersDetail(domainName, data.username, data.role, (error) => {
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
    // console.log('URI parameter cannot be empty.....');
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
        flag += 1;
      } else {
        flag += 0;
      }
    });
    if (values.length === flag) {
      values.forEach((data) => {
        communityMembershipService.checkCommunityToUpdateMembersDetail(domainName, data.username, data.role, (error, message) => {
          if (message) {
            valueExist += 1;
            console.log(valueExist);
            done(null, { message: 'data avilable' });
          } else {
            valueExist += 0;
            console.log('hiiii');
            done({ error: 'No data to delete' }, undefined);
          }
        });
      });
      setTimeout(() => {
        if (valueExist === values.length) {
          communityMembershipService.removeMembersFromCommunity(domainName, values, done);
        } else {
          done({ error: 'Member detail already exist' });
        }
      }, 1000);
    } else {
      done('Value of username and role cannot be empty');
    }
  } else {
    done('URI parameter cannot be empty.....');
  }
}

// Modify role of a members in a community


function modifyRoleOfMembersFromCommunity(domainName, values, done) {
  let flag = 0;
  let valueExist = 0;
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
        communityMembershipService.checkCommunityToUpdateMembersDetail(domainName, data.username, data.role, (error, message) => {
          if (error) {
            valueExist += 1;
            console.log(valueExist);
          } else {
            done(message);

            valueExist += 0;
          }
        });
      });
      setTimeout(() => {
        if (valueExist === values.length) {
          communityMembershipService.modifyRoleOfMembersFromCommunity(domainName, values, done);
        } else {
          done('Member detail already exist');
        }
      }, 1000);
    } else {
      done('Value of username and role cannot be empty');
    }
  } else {
    done('URI parameter cannot be empty.....');
  }
}


// get particular Community members Details
// function getParticularCommunityMembersDetails(domainName, done ) {
//     communityMembershipService.getParticularCommunityMembersDetails(domainName, done =>{
//         if(results){
//             done(err,results.rows);
//         }
//     });
// }

function getParticularCommunityMembersDetails(domainName, done) {
  console.log('INSIADE CONTROLLER');
  communityMembershipService.getParticularCommunityMembersDetails(domainName, done);
}


// check member availability

function checkCommunityToUpdateMembersDetail(data, done) {
  communityMembershipService.checkCommunityToUpdateMembersDetail(data.domain, data.username, data.role, done);
}

module.exports = {
  addMembersToCommunity,
  removeMembersFromCommunity,
  modifyRoleOfMembersFromCommunity,
  getParticularCommunityMembersDetails,
  checkCommunityToUpdateMembersDetail,
};
