const counterservice = require('./counter.service');

console.log("welcome to counter controller");

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
console.log("counter analysis domain", domain);
console.log(eventname);
console.log(payload);
  const eventregistry = eventnames[eventname];
  console.log("payload", eventregistry);
  if (!eventregistry) {
    done('event not supported..!');
    return;
  }

  eventregistry(domain, payload, done);
}
function getcounter(domain, done) {
  counterservice.getcounter(domain, done);
}
module.exports = {
  onevent,
  getcounter,
};
