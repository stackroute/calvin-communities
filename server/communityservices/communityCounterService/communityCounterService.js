const counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');

module.exports = function (eventMessage) {
  // console.log('Got a new community event: ', eventMessage);
  counterctrl.onevent(eventMessage.domain, eventMessage.event, eventMessage.body, (err) => {
  	// console.log('return count', eventMessage.body);
  });
};
