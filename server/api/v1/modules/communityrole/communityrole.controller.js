const communityRoleService = require('./communityrole.service');

function getCommunityRoles(domainName, done) {
  communityRoleService.getCommunityRoles(domainName, done);
}

function postCommunityRoles(postedData, done) {
  // const params = [postedData.domain, postedData.role, postedData.actions, postedData.toolid];
  communityRoleService.postCommunityRoles(postedData, done);
}

function patchCommunityRoles(patchData, domainName, role, done) {
  const params = [patchData.actions, patchData.toolid, domainName, role];
  communityRoleService.patchCommunityRoles(params, done);
}

module.exports = {

  getCommunityRoles,
  postCommunityRoles,
  patchCommunityRoles,
};
