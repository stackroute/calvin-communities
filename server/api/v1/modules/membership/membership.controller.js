const membershipService = require('./membership.service');

function addMemberToCommunity(params, done) {

  let flag = false;
  if ((params.domain) && (params.username) && (params.role)) {
    if ((params.domain !== null) && (params.username !== null) && (params.role !== null)) {
      flag = true;
    }
  }
  if (flag) {
    const values = {
      userName: values.username,
      domainName: values.domain,
      role: values.role,
    };
    membershipService.addMemberToCommunity(values, done);
  } else {
    done('Enter required fields.......!!!!!');
  }
}

// Get community details of a particular member
function getCommunityList(username, done) {
  membershipService.getCommunityList(username, done);
}



function modifyRoleInCommunity(params, memberRole, done) {
  membershipService.getCommunityList(params.domain, (err) => {
    if (!err) {
      membershipService.modifyRoleInCommunity(params, memberRole, done);
    }
    return done({ error: 'Internal Error Occured' }, undefined);
  })
}

  // Remove member from the community
  function deleteMemberFromCommunity(params, done) {
    membershipService.deleteMemberFromCommunity(params, done);
  }

  module.exports = {
    addMemberToCommunity,
    getCommunityList,
    modifyRoleInCommunity,
    deleteMemberFromCommunity,
  };