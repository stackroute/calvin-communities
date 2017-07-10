module.exports = function(eventMessage) {
    console.log('Got a new invite occured event ddd: ', eventMessage);
    let counterctrl = require('../../api/v1/modules/communitiescounter/counter.controller');
    console.log("event", eventMessage.domainname)
    counterctrl.incrementinvitation(eventMessage.domainname, (err, res) => {

        if (!err) {
            console.log('check for the invite which is incremented', res);
        }
    });

};
