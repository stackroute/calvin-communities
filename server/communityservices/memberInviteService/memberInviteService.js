module.exports = function(eventMessage) {
  console.log('Got a new invite occured event: ', eventMessage);
  let counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');

  counterctrl.incrementinvitation(eventMessage.domain, (err, res) => {
    if (!err) {
      console.log('check for the invite which is incremented', res);
    }
  });
 
};