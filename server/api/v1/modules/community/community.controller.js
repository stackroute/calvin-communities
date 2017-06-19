const communityServ = require('./community.service');

const templateController = require('../communitytemplates/communitytemplate.controller');

const membershipController = require('../communityMembership/communityMembership.controller');

const toolsController = require('../communitytools/communitytools.controller');

const roleController = require('../communityrole/communityrole.controller');

const async = require('async');

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
function workflowCreation(community){
  const members = {
    username: community.owner,
    domain: community.domain,
    role: 'admin',
  }
  const param = [
    community.domain, community.name, community.purpose,
    community.visibility, community.template, community.tags,
    community.owner, community.description,
    community.avatar, community.roles,
    community.owner, community.owner,
  ];
  let values = [];
  values.push(param);
  values.push(members);
  //const templateDetails = templateController.getSpecifiedTemplateData(community.purpose);
  //console.log(templateDetails.tools[0].actions);
return values;

}

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

  const values = workflowCreation(community);

  // const param = [
  //   community.domain, community.name, community.purpose,
  //   community.visibility, community.template, community.tags,
  //   community.owner, community.description,
  //   community.avatar, community.roles,
  //   community.owner, community.owner,
  // ];

  async.parallel([ communityServ.addCommunity.bind(null, values[0]),
  membershipController.addMemberToCommunity.bind(null, values[1]),], function(err, result) {
      if(err) return done(err);
return done(undefined, result[0]);
  });

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