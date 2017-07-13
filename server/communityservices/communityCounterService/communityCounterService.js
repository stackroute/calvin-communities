module.exports = function(eventMessage) {
  console.log('Got a new community event: ', eventMessage);
  let counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');
 counterctrl.onevent(eventMessage.domain, eventMessage.event, eventMessage.body, (err, result)=> {
 })
};
