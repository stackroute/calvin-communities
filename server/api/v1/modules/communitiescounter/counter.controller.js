const counterservice = require('./counter.service');

const eventnames = {
  'newmemberadded': counterservice.incrementmember,
  'newtooladded': counterservice.incrementtools,
  'newinvite': counterservice.incrementinvitation,
  'newrequests': counterservice.incrementrequests,
  'removemember': counterservice.decrementmember,
  'removetool': counterservice.decrementtools,
  'rejectinvite': counterservice.decrementinvitation,
  'rejectrequests': counterservice.decrementrequests,
};

function onevent(domain, eventname, payload, done) {
  const eventregistry = eventnames[eventname];
  if (!eventregistry) {
    done('event not supported..!');
    return;
  }
 console.log(payload);
  eventregistry(domain, payload, done);
}
function getcounter(domain, done) {
  counterservice.getcounter(domain, done);
}
module.exports = {
  onevent,
  getcounter,
};
