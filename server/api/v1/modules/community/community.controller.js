const communityServ = require('./community.service');

/**
 * Get For all communities,
 *
 * GET REQUEST
 *
 *
 */
function getAllCommunities(done) {
  communityServ.getAllCommunities(done);
}


/**
 * POST For specific communities,
 * POST REQUEST
 *
 *
 */

function addCommunity(community, done) {
  if (
        community.domain === undefined ||
        community.name === undefined ||
        community.owner === undefined ||
        community.template === undefined ||
        community.tags === undefined ||
        community.visibility === undefined ||
        community.purpose === undefined ||
        !community.domain ||
        !community.name ||
        !community.owner ||
        !community.template ||
        !community.tags ||
        !community.purpose ||
        community.tags.length === 0
    ) return done('Wrong Data Inputs', null);


  const param = [
    community.domain, community.name, community.purpose,
    community.visibility, community.template, community.tags,
    community.owner, community.description,
    community.avatar, community.roles,
    community.owner, community.owner,
  ];
  communityServ.addCommunity(param, done);
}


/**
 * Get For specific communities,
 * GET REQUEST
 *
 */
function getCommunity(domainName, done) {
  communityServ.getCommunity(domainName, done);
}

/**
 * PATCH For specific communities,
 * PATCH REQUEST
 *
 */
function updateCommunity(domainName, community, done) {
  if (!community.name ||
      community.tags === undefined ||
        community.tags.length === 0 ||
        community.updatedby === undefined ||
        !community.updatedby
    ) return done('Wrong Data Inputs', null);
  const param = [community.name, community.avatar, community.description, community.visibility,
    community.tags, community.updatedby, domainName,
  ];
  communityServ.updateCommunity(param, done);
}


module.exports = {
  getAllCommunities,
  addCommunity,
  getCommunity,
  updateCommunity,

};
