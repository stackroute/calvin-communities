const counterservice = require('./counter.service');

function getcounter(domain, done) {
  counterservice.getcounter(domain, done);
}

function incrementmember(domain, done) {
  counterservice.incrementmember(domain, done);
}

function incrementinvitation(domain, done) {
  counterservice.incrementinvitation(domain, done);
}

function incrementtools(domain, done) {
  counterservice.incrementtools(domain, done);
}

function incrementrequests(domain, done) {
  counterservice.incrementrequests(domain, done);
}

function decrementmember(domain, done) {
  counterservice.decrementmember(domain, done);
}

function decrementtools(domain, done) {
  counterservice.decrementtools(domain, done);
}

function decrementrequests(domain, done) {
  counterservice.decrementrequests(domain, done);
}

function decrementinvitation(domain, done) {
  counterservice.decrementinvitation(domain, done);
}

module.exports = {
  incrementrequests,
  incrementinvitation,
  getcounter,
  incrementmember,
  incrementtools,
  decrementtools,
  decrementmember,
  decrementrequests,
  decrementinvitation,

};
