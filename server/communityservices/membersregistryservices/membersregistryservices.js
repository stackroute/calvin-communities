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
const memberCtrl = require('../../api/v1/modules/membership/membership.controller');
const logger = require('../../logger.js');
module.exports = function(eventMessage) {
  logger.debug('Got a new community event message: ', eventMessage);
  logger.debug('domain', eventMessage.domain);
  logger.debug('type', eventMessage.type);
  if (eventMessage.type === 'add') {
    memberCtrl.userCommunityDetails(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        logger.debug(err);
      } else {
        logger.debug('Added community list');
      }
    });
  }
  if (eventMessage.type === 'modify') {
    memberCtrl.modifyRoleOfMemberInCommunity(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        logger.debug(err);
      } else {
        logger.debug('Modified community');
      }
    })
  }
  if (eventMessage.type === 'delete') {
    memberCtrl.removeMemberFromCommunity(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        logger.debug(err);
      } else {
        logger.debug('Deleted community');
      }
    });
  }

};

