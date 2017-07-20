const counterservice = require('./counter.service');
const eventregistry = {
  'newmembersadded': counterservice.incrementmember,
  'newtoolsadded': counterservice.incrementtools,
  'newinvitees': counterservice.incrementinvitation,
  'newjoinrequests': counterservice.incrementrequests,
  'removemembers': counterservice.decrementmember,
  'removetools': counterservice.decrementtools,
  'rejectinvitees': counterservice.decrementinvitation,
  'rejectrequests': counterservice.decrementrequests,
};

function onevent(domain, eventname, payload, done) {
  const eventHandlerClosure = eventregistry[eventname];
  if (!eventHandlerClosure) {
    done('event not supported..!');
    return;
  }
  console.log("countercontroller", payload);
  eventHandlerClosure(domain, payload, done);
}

function getcounter(domain, done) {
  counterservice.getcounter(domain, done);
}

module.exports = {
  onevent,
  getcounter,
};
