const service = require('./memberrequests.service');

const statusstring = [
  'approved', 'invitesent', 'accepted', 'requested', 'resent',
];


// Getting the table details for particular domain

function gettingValuesByDomain(domain, done) {
  const domainname = domain.toLowerCase();
  service.gettingValuesByDomain(domainname, done);
}


// Insert the values into the table for both request and invite

function InsertData(dataFromBody, dataFromParams, done) {
  let flag = false;
  if ((dataFromBody.person.length) && (dataFromParams)) {
    if (dataFromParams !== 'null') {
      if ((dataFromBody.type.toLowerCase() === 'invite' && dataFromBody.member.length > 0) || (dataFromBody.type.toLowerCase() === 'request' && dataFromBody.member === '')) {
        if (dataFromBody.status.toLowerCase() !== 'approved' && dataFromBody.status.toLowerCase() !== 'accepted') {
          statusstring.forEach((a) => {
            if (dataFromBody.status.toLowerCase().includes(a)) {
              flag = true;
            }
          });
        }
      }
    }
  }

  if (flag) {
    service.InsertData(dataFromBody, dataFromParams, done);
  } else {
    done({ error: 'Please enter valid values!!' }, undefined);
  }
}

// Upadate the status for both request and invite

function updateStatus(params, bodyData, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  const status = bodyData.status.toLowerCase();
  service.gettingValuesByDomainPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      if ((bodyData.status) && (bodyData.status !== 'null')) {
        statusstring.forEach((a) => {
          if (status.includes(a)) {
            flag = true;
          }
        });
      }
    }

    if (flag) {
      if ((status === 'approved') && (inviteType === 'request')) {
        if ((bodyData.member) && bodyData.member !== 'null') {
          service.statusUpdateRequest(domain, person, bodyData, done);
        } else done({ error: 'Not updated due to invalid values' }, undefined);
      } else if (((status === 'accepted') || (status === 'resent')) && (inviteType === 'invite')) {
        service.statusUpdateInvite(domain, person, bodyData, done);
      } else done({ error: 'Not updated due to invalid values' }, undefined);
    } else done({ error: 'Not updated due to invalid values' }, undefined);
  });
}

// Deleting the row in the table when the request or invite is rejected

function rejectedInviteRequest(domainvalue, personvalue, done) {
  let flag = false;
  const domainname = domainvalue.toLowerCase();
  const personname = personvalue.toLowerCase();
  service.gettingValuesByDomainPerson(domainname, personname, (error, result) => {
    if (error) done({ error: 'Domain not Exists' }, undefined);

    if (result !== undefined && result.length > 0) {
      const checkdomain = result[0].domain;
      const checkperson = result[0].person;
      if (checkdomain === domainname && checkperson === personname) {
        flag = true;
      }
    }

    if (flag) {
      service.rejectedInviteRequest(domainname, personname, done);
    } else {
      done({ error: 'Unable to delete the domain and person' }, undefined);
    }
  });
}


module.exports = {
  gettingValuesByDomain,
  InsertData,
  updateStatus,
  rejectedInviteRequest,

};
