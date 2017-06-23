const membershipService = require('./membership.service');

function addedMemberToCommunity(values, done) {
  let flag = false;
  if ((values.domain) && (values.username) && (values.role)) {
    if ((values.domain !== null) && (values.username !== null) && (values.role !== null)) {
      flag = true;
    }
  }
  if (flag) {
    const params = {
      userName: values.username,
      domainName: values.domain,
      role: values.role,
    };
    membershipService.addedMemberToCommunity(params, done);
  } else {
    done('Enter required fields.......!!!!!');
  }
}

// get particular member with all community details
function getParticularMemberDetailInCommunities(userName, done) {
  membershipService.getParticularMemberDetailInCommunities(userName, done);
}

function modifyRoleOfMemberFromCommunity(params, memberRole, done) {
  let flag = false;
  if (memberRole) {
    if (memberRole !== null) {
      flag = true;
    }
  }
  if (flag) {
    membershipService.modifyRoleOfMemberFromCommunity(params, memberRole, done);
  } else {
    done('Enter required fields.......!!!!!');
  }
}

// Remove member from the community
function removeMemberFromCommunity(params, done) {
  membershipService.removeMemberFromCommunity(params, done);
}

module.exports = {
  addedMemberToCommunity,
  getParticularMemberDetailInCommunities,
  modifyRoleOfMemberFromCommunity,
  removeMemberFromCommunity,
};
