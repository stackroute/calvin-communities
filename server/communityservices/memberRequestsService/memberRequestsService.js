const logger = require('../../logger');
const ctrl = require('../../api/v1/modules/communitymembership/communitymembership.controller');

module.exports = function member(eventMessage) {
  logger.debug('Got a new member added ', eventMessage);

  logger.debug('event', eventMessage.domain);


  // For member adding when invite accepted or request

if(eventMessage.type = 'inviteaccepted')
{
  const arr = [];
  arr.push({
    username: eventMessage.personemail,
    role: eventMessage.roleforperson,
  });
  ctrl.addMembersToCommunity(eventMessage.domain, arr, (err, res) => {
    if (!err) {
      logger.debug('check for the communitymembership table whether he is added', res);
    }
  });
}
};
