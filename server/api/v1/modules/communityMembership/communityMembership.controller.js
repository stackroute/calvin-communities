const membershipService = require('./communityMembership.service');

function addMemberToCommunity(values, done){
  let flag = false;
  if((values.domain) && (values.username) && (values.role)){
    if((values.domain !== null) && (values.username !== null) && (values.role !== null)){
      flag = true;
    }
  }
  if(flag){
    const  params = {
      userName: values.username,
      domainName: values.domain,
      role: values.role,
    };
    membershipService.addMemberToCommunity(params, done);
  }else{
    done('Enter All Required Fields ........!!!');
  }
}

// get particular member with all community details
function getParticularMemberDetailInCommunities(userName, done) {
   membershipService.getParticularMemberDetailInCommunities(userName,done); 
}

// get particular Community members Details
function getParticularCommunityMemberDetails(domainName, done) {
   membershipService.getParticularCommunityMemberDetails(domainName,done); 
}

// Modify role of a member in a community
function modifyRoleOfMemberFromCommunity(params, memberRole, done) {
  let flag = false;
  if(memberRole){
    if(memberRole !== null){
      flag = true;
    }
  }
  if(flag){
    membershipService.modifyRoleOfMemberFromCommunity(params, memberRole, done);
  }else{
    done('Role Should Not Be Empty....!!! ');
  }
}

//Remove member from the community
function removeMemberFromCommunity(params, done) {
    membershipService.removeMemberFromCommunity(params, done);
}

module.exports = {
  addMemberToCommunity,
  getParticularMemberDetailInCommunities,
  getParticularCommunityMemberDetails,
  modifyRoleOfMemberFromCommunity,
  removeMemberFromCommunity,
};
