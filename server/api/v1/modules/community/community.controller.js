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
    role: community.roles.slice(),
  }
  console.log(members);
  //const templateDetails = templateController.getSpecifiedTemplateData(community.purpose);
  //console.log(templateDetails.tools[0].actions);
return members;

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



  const param = [
    community.domain, community.name, community.purpose,
    community.visibility, community.template, community.tags,
    community.createdby, community.description,
    community.avatar, community.roles,
    community.createdby, community.createdby,
  ];
  communityServ.addCommunity(param, done);


    if(community.roles.length === 0) community.roles = ['Admin'];
  const members = workflowCreation(community);

  const param = [
    community.domain, community.name, community.purpose,
    community.visibility, community.template, community.tags,
    community.owner, community.description,
    community.avatar, community.roles,
    community.owner, community.owner,
  ];

  async.parallel([
  membershipController.addMemberToCommunity.bind(null, members),], function(err, result) {
      if(err) return done(err);
      return done(undefined, result[0]);
  });
  //});
  //communityServ.addCommunity(param, done);

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

  const param = [community.name, community.description, community.visibility,

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
