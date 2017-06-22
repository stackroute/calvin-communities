const communityServ = require('./community.service');

const async = require('async');

const templateController = require('../communitytemplates/communitytemplate.controller');

const membershipController = require('../communitymembership/communitymembership.controller');

const toolsController = require('../communitytools/communitytools.controller');

const roleController = require('../communityrole/communityrole.controller');

const counterController = require('../communitiescounter/counter.controller');
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
function getTemplateDetails(community) {
 // loading specified template
  const templateDetails = templateController.getTemplateOfTemplateName(community.template);
  if (templateDetails.length !== 1) {
    return -1;
  }
  const tags = templateDetails[0].tags;
// CommunityCreation Data
  const com = [
    community.domain, community.name, community.purpose,
    community.status, community.template, community.tags,
    community.owner, community.description,
    community.avatar,
    community.owner, community.owner,
  ];

// Adding admin as a member, data for addMembers
  const members = {
    username: community.owner,
    domain: community.domain,
    role: 'admin',
  };

// getting tools data from specified template for addTools
  const tools = [];
  templateDetails[0].tools.forEach((element) => {
    const toolsobject = {
      domain: community.domain,
      toolId: element.toolId,
      actions: element.actions,
      activityEvents: element.activityEvents,
    };
    tools.push(toolsobject);
  });

// getting roles data from specified template
  const roles = [];
  templateDetails[0].roleActions.forEach((element) => {
    element.toolsActions.forEach((data) => {
      const rolesobject = {
        domain: community.domain,
        role: element.role,
        toolId: data.toolId,
        actions: data.actions,
      };
      roles.push(rolesobject);
    });
  });

  // returning all data in single error
  const values = [];
  values.push(com);
  values.push(members);
  values.push(tools);
  values.push(roles);
  return values;
}

function addCommunity(community, done) {
  if (
        community.domain === undefined ||
        community.name === undefined ||
        community.owner === undefined ||
        community.template === undefined ||
        community.tags === undefined ||
        community.status === undefined ||
        community.purpose === undefined ||
        !community.domain ||
        !community.name ||
        !community.owner ||
        !community.template ||
        !community.tags ||
        !community.purpose ||
        community.tags.length === 0
    ) return done('Wrong Data Inputs', null);

  const values = getTemplateDetails(community);

  if (values === -1) {
    return done('no template found for the given purpose');
  }


  async.parallel([
    communityServ.addCommunity.bind(null, values[0]),
    membershipController.addMemberToCommunity.bind(null, values[1]),
    roleController.postCommunityRoles.bind(null, values[3]),
    toolsController.postTools.bind(null, values[2]),
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
