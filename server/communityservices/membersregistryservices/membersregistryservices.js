const memberService = require('../../api/v1/modules/membership/membership.service');
const countereventservice = require('../server/communityservices/communityCounterService')
module.exports = function (eventMessage) {
  console.log('Got a new community event message: ', eventMessage);
  console.log('domain', eventMessage.domain);
  memberService.userCommunityDetails(eventMessage.domain, eventMessage.value, (err, res) => {
  	if (err) {
    console.log('error');
  } else {
  	console.log('community list');
  }
  });
  countereventservice.incrementmember(eventMessage.domain, (err, res)=>{
  	if (err) {
    console.log('error');
  } else {
  	console.log('memberincremented');
  }
});
};