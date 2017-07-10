module.exports = function(eventMessage) {
  console.log('Got a new community event: ', eventMessage);
  let counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');

  counterctrl.incrementmember(eventMessage.domain, (err, res) => {
    if (!err) {
      console.log('check for the member is incremented', res);
    }
  });
  counterctrl.incrementtools(eventMessage.domain, (err, res) => {
    if (!err) {
      console.log('check for the tools is incremented');
    }
  });
  counterctrl.incrementrequests(eventMessage.domain,(err,res)=>{
    if(!err){
      console.log('check for the requests is incremented');
    }
  });
   counterctrl.incrementinvitation(eventMessage.domain,(err,res)=>{
    if(!err){
      console.log('check for the invitations is incremented');
    }
  });
};
