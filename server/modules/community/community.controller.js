require('body-parser');

const communityServ = require('./community.service');
// function for getting all communities data
function allcommunities(done) {
  communityServ.getallcommunities(done);
}

// to add a new community, with all possible checks
function addcommunity(community) {
  return new Promise((resolve, reject) => {
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
    ) {
      reject('Input validation error');
    }

    return service.addcommunity(community).then((result) => { resolve(result); }, (err) => { reject(err); });
  });
}


// function addcommunity(community, done) {
//     ifd(community.domain === undefined ||
//     community.name === undefined ||
//     community.owner === undefined ||
//     community.template === undefined ||
//     community.tags === undefined ||
//     community.status === undefined ||
//     !community.domain ||
//     !community.name ||
//     !community.owner ||
//     !community.template ||
//     !community.tags ||
//     community.tags.length === 0 ||
//     community.status !== ('Active' || 'Inactive')
//     ) {
//       done('Input validation error', undefined);
//     }

//     // service.addcommunity(community).then((result) => { done(undefined, result); }, (err) => { done(err); } ).catch(err){ done(err) };

//     service.addcommunity(community, done);
// }


// get data for a specific community
function getcommunity(domainName) {
  return service.getcommunity(domainName);
}
// update details of a particular community
function updatecommunity(community) {
  if (
    community.tags === undefined ||
    community.tags.length === 0 ||
    community.status !== ('Active' || 'Inactive') ||
    community.updatedby === undefined ||
    !community.updatedby
    ) { return; }

  return service.updatecommunity(community.params.id, community.body);
}


module.exports = {
  allcommunities,
  addcommunity,
  getcommunity,
  updatecommunity,

};
