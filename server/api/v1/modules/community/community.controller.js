const async = require('async');

const _ = require('lodash');

const communityService = require('./community.service');

const templateController = require('../communitytemplates/communitytemplate.controller');

const membershipController = require('../communitymembership/communitymembership.controller');

const toolsController = require('../communitytools/communitytools.controller');

const roleController = require('../communityrole/communityrole.controller');

const counterController = require('../communitiescounter/counter.controller');

const registerPublisherService = require('../../../../common/kafkaPublisher');

/**
 * Get For all communities,
 *
 * GET REQUEST
 *
 *
 */
function getAllCommunities(done) {
  communityService.getAllCommunities(done);
}


/**
 * Used with POST Request, to get the template details
 *
 *
 *
 */
function getTemplateDetails(community) {
    // loading specified template
  const status = 'Active';
   // initially the community will be active by default
  const ownersRole = 'Owner';
  // Owner will be assigned thew mentioned role
  const templateDetails = templateController.getTemplateOfTemplateName(community.template);
  if (templateDetails.length !== 1) {
    return -1;
  }

  const templateRoles = [];
  templateDetails[0].roleActions.forEach((data) => {
    templateRoles.push(data.role);
  });

  if (_.has(community, 'roles')) {
    community.roles.forEach((data) => {
      templateRoles.push(data);
    });
  }

    // CommunityCreation Data
  const com = [
    community.domain, community.name, community.avatar, community.purpose,
    templateRoles,
    status, community.template,
    (community.tags).concat(templateDetails[0].tags),
    community.owner, community.description,
    community.visibility,
    community.owner, community.owner,
  ];
  // logger.debug(com);
    // Adding admin as a member, data for addMembers
  const members = {
    username: community.owner,
    role: ownersRole,
  };

    // getting tools data from specified template for addTools
  const tools = [];
  templateDetails[0].tools.forEach((element) => {
    const toolsobject = {
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
        role: element.role,
        toolId: data.toolId,
        actions: data.actions,
      };
      roles.push(rolesobject);
    });
  });
    // returning all data in single array
  const values = [];
  values.push(com);
  values.push(members);
  values.push(tools);
  values.push(roles);
  return values;
}

/**
 * POST For adding new community,
 * POST REQUEST
 *
 *
 */
function addCommunity(community, done) { // eslint-disable-line consistent-return
  let values;
  const nameRegex = /^([a-zA-Z0-9.]){5,20}$/;
  if (Object.keys(community).length === 1) { return done('Please pass some data to process'); }
  if (!community.domain.match(nameRegex)) { return done('Domain Name has to be at least 5 characters long and consist of Alphanumeric Values and a (.)'); }

  if (!_.has(community, 'tags') || !_.gt(community.tags.length, 0)) { return done('At least one Tag is required to to be passed'); }

  if (!_.has(community, 'name') || _.isEmpty(community.name)) { return done('A Name needs to be passed'); }

  if (!_.has(community, 'owner') || _.isEmpty(community.owner)) { return done('An Owner value needs to be passed'); }

  if (!_.has(community, 'template') || _.isEmpty(community.template)) { return done('A Template Value needs to be passed'); }

  if (!_.has(community, 'purpose') || _.isEmpty(community.purpose)) { return done('A Community has to have a purpose'); }

  if (!_.has(community, 'avatar') || _.isEmpty(community.avatar)) { return done('An Avatar needs to be added'); }

  if (!_.has(community, 'visibility')) { return done('Visibility can be from given values only, either \'Public\', \'Private\' or \'Moderated\' '); }

  if (
     _.isEqual(community.visibility, 'Public') ||
    _.isEqual(community.visibility, 'Private') ||
    _.isEqual(community.visibility, 'Moderated')
    ) {
    community.domain = community.domain.toLowerCase(); // eslint-disable-line no-param-reassign
    values = getTemplateDetails(community);
  } else return done('Visibility can be from given values only, either \'Public\', \'Private\' or \'Moderated\' ');

  if (values === -1) {
    return done('A Template Name is supposed to be chosen from mentioned list only');
  }

  communityService.getCommunity(community.domain,
  (err, res) => { // eslint-disable-line consistent-return
    if (err) throw err;
    if (res.length === 0) {
      return async.parallel([
        communityService.addCommunity.bind(null, values[0]),
        membershipController.addMembersToCommunity.bind(null,
                community.domain, [values[1]]),
        toolsController.postTools.bind(null, values[2], community.domain),
        roleController.postCommunityRoles.bind(null, community.domain, values[3]),

      ],
        (error, result) => {
          if (err) return done(err);
           publishMessageToTopic(community.domain);
           return done(undefined, result[0]);
        });
    } return done('Domain Already Exists');
  });
}

/**
 * Get For specific communities,
 * GET REQUEST
 *
 */
function getCommunity(domain, counter, done) {
  if (counter) {
    async.parallel([
      communityService.getCommunity.bind(null, domain.toLowerCase()),
      counterController.getcounter.bind(null, domain.toLowerCase()),
    ], (err, result) => {
      if (err) return done(err);
      /* eslint-disable no-param-reassign*/
      if (!_.isEmpty(result[1])) {
        result[0][0].invitations = result[1][0].invitations;
        result[0][0].members = result[1][0].members;
        result[0][0].requests = result[1][0].requests;
        result[0][0].tools = result[1][0].tools;
      }
      /* eslint-disable no-param-reassign*/
      return done(undefined, result[0]);
        // result[0].push(counts);
    });
  } else {
    communityService.getCommunity(domain.toLowerCase(), done);
  }
}

/**
 * PATCH For specific communities,
 * PATCH REQUEST
 *
 */
function updateCommunity(domainName, community, status, done) {
  if (Object.keys(community).length === 1) { return done('Please pass some data to process'); }

  if (!_.has(community, 'tags') || !_.gt(community.tags.length, 0)) { return done('At least one Tag is required to to be passed'); }

  if (!_.has(community, 'name') || _.isEmpty(community.name)) { return done('A Name needs to be passed'); }

  if (!_.has(community, 'updatedby') || _.isEmpty(community.updatedby)) { return done('An Updater\'s data is required to be sent'); }

  status=status.toLowerCase();

  if( status === 'disable') { status = 'Inactive'; }
    else if( status === 'suspend') { status = 'Terminated' ;}
      else if (status ==='enable') { status = 'Active'; }
      else { status = 'Active'; }
  if ((
            _.isEqual(community.visibility, 'Public') ||
            _.isEqual(community.visibility, 'Private') ||
            _.isEqual(community.visibility, 'Moderated'))
        ) {
    const param = [community.name, community.avatar, community.description, community.visibility,
      community.tags, community.updatedby, status, domainName.toLowerCase(),
    ];

    return communityService.updateCommunity(param, done);
  } return done('Wrong Data Inputs', null);
}

function publishMessageToTopic(dataFromURI) {
  let message = { domain: dataFromURI };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('topic2', message, (err, res) => {
    if (err) {
      console.log('error occured', err);
    } else {
      console.log('result is', res);
    }
  });
}

module.exports = {
  getAllCommunities,
  addCommunity,
  getCommunity,
  updateCommunity,

};
