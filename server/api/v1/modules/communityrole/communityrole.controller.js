const communityRoleService = require('./communityrole.service');
const logger = require('../../../../logger');
const async = require('async');

function getCommunityRoles(domainName, done) {
  communityRoleService.getCommunityRoles(domainName, done);
}
function getCommunityRolesOnly(domainName, onlyroles, done) {
  communityRoleService.getCommunityRolesOnly(domainName, onlyroles, done);
}
/* function postCommunityRoles(postedData, done) {
  let count = 0;
  postedData.forEach((val) => {
    if (val.domain && val.role && val.actions && val.toolId) {
      if (val.domain !== '' && val.role !== '' && val.actions !== '' && val.toolId !== '') {
        logger.debug('from postCommunityRoles', val.domain, val.actions, val.toolId);
        communityRoleService.checkCommunityRole(val.domain, val.role, val.toolId, (err) => {
          if (err) {
            count += 1;
            logger.debug(count);
          } else {
            count += 0;
          }
        });
      }
    }
  });
  setTimeout(() => {
    if (count === postedData.length) {
      communityRoleService.postCommunityRoles(postedData, done);
    } else {
      done({ error: 'entry already exists' }, undefined);
    }
  }, 100);
}*/
function checkRole(domainName, postedData, done) {
  let count = 0;
  let iterations = 0;
  postedData.forEach((val) => {
    if (domainName && val.role && val.actions && val.toolId) {
      if (domainName !== '' && val.role !== '' && val.actions !== '' && val.toolId !== '') {
        logger.debug('from postCommunityRoles', domainName, val.actions, val.toolId);
        communityRoleService.checkCommunityRole(domainName, val.role, val.toolId, (err) => {
          iterations += 1;
          if (err) {
            count += 1;
            logger.debug(count);
          } else {
            count += 0;
          }
          if (iterations === postedData.length) {
            logger.debug('iterations', iterations);
            logger.debug('count', count);
            done(null, count);
          }
        });
      }
    }
  });
}
function postRoles(domainName, postedData, count, done) {
  // console.log(count)
  logger.debug('counterVALU---->', count);
  if (count === postedData.length) {
    communityRoleService.postCommunityRoles(domainName, postedData, (err) => {
      if (err) {
        done(err);
        return;
      }
      return done(undefined, { message: 'Added' });
    });
  } else {
    done({ error: 'entry already exists' }, undefined);
  }
}
function postCommunityRoles(domainName, postedData, done) {
  async.waterfall([
    checkRole.bind(null, domainName, postedData),
    postRoles.bind(null, domainName, postedData),
  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(undefined, result);
    }
  });
}
/* function patchCommunityRoles(patchData, domainName, role, done) {
  const params = [patchData[0].actions, domainName.toLowerCase(),
    role.toLowerCase(), patchData[0].toolId.toLowerCase(),
  ];
  let count = 0;
  logger.debug(domainName);
  logger.debug(role);
  communityRoleService.checkCommunityRole2(domainName, role, (err) => {
    if (!err) {
      count += 1;
      logger.debug(count);
    } else {
      count += 0;
    }
  });
  setTimeout(() => {
    if (count === patchData.length) {
      communityRoleService.patchCommunityRoles(params, done);
    } else {
      done({ error: 'Patch only allowed for existant data' }, undefined);
    }
  }, 100);
}
*/
function checkRole2(domainName, role, done) {
  let count = 0;
  logger.debug(domainName);
  logger.debug(role);
  communityRoleService.checkCommunityRole2(domainName, role, (err) => {
    if (!err) {
      count += 1;
      logger.debug(count);
    } else {
      count += 0;
    }
    done(null, count);
  });
}
function patchRoles(patchData, domainName, role, count, done) {
  /*  if (count === patchData.length) {*/
  logger.debug('patchData.length', patchData.length);
  if (count > 0) {
    communityRoleService.patchCommunityRoles(patchData, domainName, role, done);
  } else {
    done({ error: 'Patch only allowed for existant data' }, undefined);
  }
}
function patchCommunityRoles(patchData, domainName, role, done) {
  /* const params = [patchData[0].actions, domainName.toLowerCase(),
    role.toLowerCase(), patchData[0].toolId.toLowerCase(),
  ];*/
  async.waterfall([
    checkRole2.bind(null, domainName, role),
    patchRoles.bind(null, patchData, domainName, role),
  ], (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
}

function checkCommunityRole2(domainName, role, done) {
  communityRoleService.checkCommunityRole2(domainName, role, done);
}
// function patchCommunityRoles(patchData, domainName, role, done) {
//   logger.debug('patchData[0].actions', patchData[0].actions);
//   const params = [patchData[0].actions, domainName.toLowerCase(),
//     role.toLowerCase(), patchData[0].toolId.toLowerCase()];
//   // logger.debug("patchData[0].actions",patchData[0].toolId.toLowerCase());
//   communityRoleService.patchCommunityRoles(params, done);
// }
module.exports = {
  getCommunityRoles,
  postCommunityRoles,
  patchCommunityRoles,
  getCommunityRolesOnly,
  checkCommunityRole2,
};
