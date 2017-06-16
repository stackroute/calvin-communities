require('body-parser');

const communityServ = require('./community.service');
// function for getting all communities data
function getallcommunities(done) {
  communityServ.getallcommunities(done);
}

// to add a new community, with all possible checks
function addcommunity(community, done) {
    
   if (
    community.domain === undefined ||
    community.name === undefined ||
    community.owner === undefined ||
    community.template === undefined ||
    community.tags === undefined ||
    community.status === undefined ||
    !community.domain ||
    !community.name ||
    !community.owner ||
    !community.template ||
    !community.tags ||
    community.tags.length === 0 ||
    community.status !== ('Active' || 'Inactive')
    ) done(err); 

    const param = [community.domain, community.name,
    community.status, community.template, community.tags,
    community.createdby, community.description,
    community.avatar, community.poster, community.roles,
    community.createdby, community.createdby];

     communityServ.addcommunity(param, done);

}

// get data for a specific community
function getcommunity(domainName, done) {
   communityServ.getcommunity(domainName, done);
}
// update details of a particular community
function updatecommunity(domainName, community, done) {

  if (
    community.tags === undefined ||
    community.tags.length === 0 ||
    community.status !== ('Active' || 'Inactive') ||
    community.updatedby === undefined ||
    !community.updatedby
    ) { done(err) }; 
    const param = [community.name, community.description, community.status,
    community.tags, community.updatedby, domainName];

  communityServ.updatecommunity(param, done);
  
}


module.exports = {
  getallcommunities,
  addcommunity,
  getcommunity,
  updatecommunity,

};
