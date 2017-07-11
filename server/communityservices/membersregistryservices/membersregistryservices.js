const memberService = require('../../api/v1/modules/membership/membership.service');
module.exports = function(eventMessage) {
  console.log('Got a new community event message: ', eventMessage);
  console.log('domain', eventMessage.domain);
  if (eventMessage.type === 'add') {
    memberService.userCommunityDetails(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Added community list');
      }
    });
  }
  if (eventMessage.type === 'modify') {
    memberService.modifyRoleOfMemberInCommunity(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Modified community');
      }
    })
  }
  if (eventMessage.type === 'delete') {
    memberService.removeMemberFromCommunity(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Deleted community');
      }
    });
  }

};
