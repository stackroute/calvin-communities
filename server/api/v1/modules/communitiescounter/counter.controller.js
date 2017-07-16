const counterservice = require('./counter.service');

const eventnames = {
  newmemberadded: counterservice.incrementmember,
  newtooladded: counterservice.incrementtools,
  newinvite: counterservice.incrementinvitation,
  newrequests: counterservice.incrementrequests,
  removemember: counterservice.decrementmember,
  removetool: counterservice.decrementtools,
  rejectinvite: counterservice.decrementinvitation,
  rejectrequests: counterservice.decrementrequests,
};

function onevent(domain, eventname, payload, done) {
  const eventregistry = eventnames[eventname];
  if (!eventregistry) {
    done('event not supported..!');
    return;
  }

  eventregistry(domain, payload, done);
}
onevent('stackroute', 'newmemberadded', 2, (err, result) => {
  console.log('dscdscdsa');
});


module.exports = {
  onevent,
};
