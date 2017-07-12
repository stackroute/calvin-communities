module.exports = function(eventMessage) {
  console.log('Got a new invite occured event ddd: ', eventMessage);
  let counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');
  let ctrl = require('../../api/v1/modules/communitymembership/communitymembership.controller');
  console.log("event", eventMessage.domainname)
  let type = eventMessage.type;

  //if invite occured
  if (eventMessage.type === "InviteOccured") {
    counterctrl.incrementinvitation(eventMessage.domainname, (err, res) => {
      if (!err) {
        console.log('check for the invite which is incremented', res);
      }
    });
  }

  // if request occured
  if (eventMessage.type === "RequestOccured") {
    counterctrl.incrementrequests(eventMessage.domainname, (err, res) => {

      if (!err) {
        console.log('check for the request which is incremented', res);
      }
    });
  }

  //For member adding when invite accepted or request 
  if (eventMessage.type === 'MemberAdding') {
    const arr = [];
    arr.push({
      username: eventMessage.personemail,
      role: eventMessage.roleforperson
    });
    ctrl.addMembersToCommunity(eventMessage.domainname, arr, (err, res) => {
      if (!err) {
        console.log('check for the communitymembership table whether he is added', res);
      }
    });
  }

  //For decrement counter when invite rejected

  if (eventMessage.type === 'InviteRejection') {
    counterctrl.decrementinvitation(eventMessage.domainname, (err, res) => {
      if (!err) {
        console.log('check for the invite which is incremented', res);
      }
    });
  }

  //For decrement counter when request rejected
  if (eventMessage.type === 'RequestRejection') {
    counterctrl.decrementrequests(eventMessage.domainname, (err, res) => {
      if (!err) {
        console.log('check for the invite which is incremented', res);
      }
    });
  }

};
