module.exports = function(eventMessage) {
  console.log('Got a new request event: ', eventMessage);
  let counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');

  counterctrl.incrementrequests(eventMessage.domain, (err, res) => {
    if (!err) {
      console.log('check for the request which is incremented', res);
    }
  });
};