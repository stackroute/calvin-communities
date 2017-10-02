const memberCtrl = require('../../api/v1/modules/membership/membership.controller');
const logger = require('../../logger.js');
const events = require('../../appconfig/index').events;
module.exports = function(eventMessage) {
  // logger.debug('Got a new community event message: ', eventMessage);
  // logger.debug('domain', eventMessage.domain);
  if (eventMessage.event === events.addmember ) {

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
  if (eventMessage.type === 'deletemember') {
    memberCtrl.removeMemberFromCommunity(eventMessage.domain, eventMessage.value, (err, res) => {
      if (err) {
        logger.debug(err);
      } else {
        logger.debug('Deleted community');
      }
    });
  }

};