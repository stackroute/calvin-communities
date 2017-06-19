const communityServ = require('./community.service');

const async = require('async');

const logger = require('log4js').getLogger();

const templateController = require('../communitytemplates/communitytemplate.controller');

const membershipController = require('../communityMembership/communityMembership.controller');

const toolsController = require('../communitytools/communitytools.controller');

const roleController = require('../communityrole/communityrole.controller');

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
function workflowCreation(community) {
  const templateDetails = templateController.getTemplateOnTemplateName(community.template);
  logger.debug(templateDetails);
  const com = [
    community.domain, community.name, community.purpose,
    community.visibility, community.template, community.tags,
    community.owner, community.description,
    community.avatar, community.roles,
    community.owner, community.owner,
  ];

  const members = {
    username: community.owner,
    domain: community.domain,
    role: 'admin',
  };

  const values = [];
  values.push(com);
  values.push(members);
  values.push([com,community,com]);
  return values;
}
function addroles(value, done){
  value.forEach((element) => {
    logger.debug(element);

  })
}

function addCommunity(community, done) {
  const values = workflowCreation(community);

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

  async.parallel([
    communityServ.addCommunity.bind(null, values[0]),
    membershipController.addMemberToCommunity.bind(null, values[1]),
    addroles.bind(null, values[2]),
     ],
    (err, result) => {
    if (err) return done(err);
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
