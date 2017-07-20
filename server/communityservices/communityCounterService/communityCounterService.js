module.exports = function (eventMessage) {
  console.log('Got a new community event: ', eventMessage);
  const counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');
  counterctrl.onevent(eventMessage.domain, eventMessage.event, eventMessage.body, (err, result) => {
  	console.log("return count", eventMessage.body);
  });
};
