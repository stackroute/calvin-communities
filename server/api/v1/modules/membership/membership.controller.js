const membershipService = require('./membership.service');
const communityService = require('./../community/community.controller');
const async = require('async');

// function getCommunityList(username, done) {
//   membershipService.getCommunityList(username, done);
// }
/*
 * Get community Details of a particular member
 */
/* async.waterfall([
function getCommunityList(username, done) {
  membershipService.getCommunityList(username, done);
},

function getAvatarForCommunities(username, done) {
  membershipService.getAvatarForCommunities(username, done);
}
], function(err, result) {
	if(err) {
		return err;
	} else {
		return result;
	}

});*/
// function getCommunityListFromService(username,done){
// 	console.log("community list");
//   const arr = [];
// 	membershipService.getCommunityList(username, (err,result)=>{
// 		if(!err){
// 			console.log(result);
//       result.communityDetails.forEach((data) => {
//         arr.push(data.domain);
//         console.log(arr);
//         done(null, arr);
//       })
// 			// done(null,result);
// 		}else{
// 			done(err,undefined);
// 					}
// 	});
// }
// function getAvatarForCommunities(result,done){
// 	const arr =[];
// 	console.log("Avtar", result);
// 	result.forEach(function(data) {
// 		console.log("data", data.communityDetails);
// 		arr.push(data.communityDetails.domain);
// 		console.log("Avtar image", arr);
// 	})
// 	done();
// }

function getCommunityList(username, done) {
  const arr = [];
	membershipService.getCommunityList(username, (err,result)=>{
    if(!err){
      console.log("result", result);
      result.communityDetails.forEach((data) => {
        arr.push(data.domain);
        console.log("data", arr);
        });
        communityService.getMultipleCommunities(arr, (err,result) => {
          console.log("domain", arr);
        })
        done(null, arr);
    }else{
      done(err,undefined);
          }
  });
}

/*
 * post the community details
 */

function userCommunityDetails(domainName, data, done) {
  let count = 0;
  data.forEach((values) => {
    if (domainName && values.username && values.role) {
      if (domainName !== null && values.username !== null && values.role !== null) {
        count += 1;
      } else {
        count += 0;
      }
    }
  });
  if (count === data.length) {
    membershipService.userCommunityDetails(domainName, data, done);
  } else {
    return done({ error: 'please enter all required fields' }, undefined);
  }
  // membershipService.userCommunityDetails(domainName, data, done);
  return null;
}

/*
 * Modify role of a member in a community
 */
function modifyRoleOfMemberInCommunity(domainName, data, done) {
  membershipService.getDetailsForDeletionAndUpdation(domainName, data, (err) => {
    if (!err) {
      return membershipService.modifyRoleOfMemberInCommunity(domainName, data, done);
    }
    return done({ error: 'Error Occured' }, undefined);
  });
  // membershipService.modifyRoleOfMemberInCommunity(domainName, data, done);
}

/*
 * Remove member from the community
 */

function removeMemberFromCommunity(domainName, data, done) {
  membershipService.getDetailsForDeletionAndUpdation(domainName, data, (err) => {
    if (!err) {
      membershipService.removeMemberFromCommunity(domainName, data, done);
    }
    return done({ error: 'Error Occured' }, undefined);
  });
  // membershipService.removeMemberFromCommunity(domainName, data, done);
}

module.exports = {
  getCommunityList,
  // getAvatarForCommunities,
  userCommunityDetails,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,

};
