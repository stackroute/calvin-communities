const communityRoleService = require('./communityrole.service');

function getCommunityRoles(domainName, done) {
  communityRoleService.getCommunityRoles(domainName, done);
}


// function getCommunityRoles(domainName, done) {
//   communityRoleService.getCommunityRoles(domainName, done);
// }

function postCommunityRoles(postedData, done) {
  let count = 0;
  postedData.forEach((val) => {
    if (val.domain && val.role && val.actions && val.toolId) {
      if (val.domain !== '' && val.role !== '' && val.actions !== '' && val.toolId !== '') {
        console.log('from postCommunityRoles', val.domain, val.actions, val.toolId);
        communityRoleService.checkCommunityRole(val.domain, val.role, val.toolId, (err) => {
          if (err) {
            count += 1;
            console.log(count);
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
}

function patchCommunityRoles(patchData, domainName, role, done) {
  const params = [patchData[0].actions, domainName.toLowerCase(),
    role.toLowerCase(), patchData[0].toolId.toLowerCase(),
  ];
  let count = 0;
  console.log(domainName);
  console.log(role);
  communityRoleService.checkCommunityRole2(domainName, role, (err) => {
    if (!err) {
      count += 1;
      console.log(count);
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


// function patchCommunityRoles(patchData, domainName, role, done) {
//   console.log('patchData[0].actions', patchData[0].actions);
//   const params = [patchData[0].actions, domainName.toLowerCase(),
//     role.toLowerCase(), patchData[0].toolId.toLowerCase()];
//   // console.log("patchData[0].actions",patchData[0].toolId.toLowerCase());
//   communityRoleService.patchCommunityRoles(params, done);
// }

module.exports = {

  getCommunityRoles,
  postCommunityRoles,
  patchCommunityRoles,
};
