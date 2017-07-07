const service = require('./memberrequests.service');
const registerPublisherService = require('../../../../common/kafkaPublisher');

const statusstring = [
  'approved', 'invitesent', 'accepted', 'requested', 'resent',
];

let status = '';
// Getting the table details for particular domain

function gettingValuesByDomain(domain, done) {
  const domainname = domain.toLowerCase();
  service.gettingValuesByDomain(domainname, done);
}


// Insert the values into the table for both request and invite

function InsertData(dataFromBody, dataFromParams, type, done) {
  let flag = false;
  let flag2 = 0;
  const persons = dataFromBody.invitee;
  persons.forEach((b) => {
    if ((b.email !== 'null') && (b.email)) {
      if ((type.toLowerCase() === 'invite' && b.role.toLowerCase() !== '') || (type.toLowerCase() === 'request' && b.role.toLowerCase() === '')) {
        communityRoleService.checkCommunityRole2(domainName, data.role, (error, message) => {
            if (message) {
              console.log("measssge")
              flag2 += 1;
            } else {
              flag2 += 0;
            }
          });
      }
    }
  });

  if (dataFromParams) {
    if (dataFromParams !== 'null') {
      if (type) {
        if ((type.toLowerCase() === 'invite' && dataFromBody.invitedby.length > 0) || (type.toLowerCase() === 'request' && dataFromBody.invitedby === '')) {
          flag = true;
        }
      }
    } 
  }

  setTimeout(() => {
  if ((flag) && (flag2 === persons.length)) {
    if (type === 'invite') { status = 'invitesent'; } else if (type === 'request') { status = 'requested'; }
    service.InsertData(dataFromBody, dataFromParams, status, type, (err, result) => {
      if (err) {
        return done(err);
      }
      if (type === 'invite') {
        publishMessageToTopic4(dataFromParams);
      }
      if (type === 'request') {
        publishMessageToTopic5(dataFromParams);
      }
      return done(undefined, { message: 'Inserted' });
    });
  } else {
    done({ error: 'Please enter valid values!!' }, undefined);
  }
}, 100);
}

// Upadate the status for both invite

function updateStatusInvite(params, dataFromBody, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  service.gettingValuesByDomainPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      if ((dataFromBody.status) && (dataFromBody.status !== null)) {
        statusstring.forEach((a) => {
          if (dataFromBody.status.includes(a)) {
            flag = true;
          }
        });
      }
    }
    if ((flag) && ((inviteType === 'invite') && (dataFromBody.status === 'accepted'))) {
      service.statusUpdateInvite(domain, person, dataFromBody, done);
    } else done({ error: 'Not updated due to invalid values' }, undefined);
  });
}

// Upadate the status for both invite

function updateStatusRequest(params, bodyData, done) {
  let flag = false;
  const domain = params.domain.toLowerCase();
  const person = params.person.toLowerCase();
  service.gettingValuesByDomainPerson(domain, person, (error, result) => {
    if (error) done({ error: 'error in getting type for the given domain' }, undefined);
    let inviteType = '';
    if (result !== undefined && result.length > 0) {
      inviteType = result[0].type;
      if ((bodyData.status) && (bodyData.status !== null)) {
        statusstring.forEach((a) => {
          if (bodyData.status.includes(a)) {
            flag = true;
          }
        });
      }
    }


    if ((flag) && ((inviteType === 'request') && (bodyData.status === 'approved'))) {
      if ((bodyData.invitedby) && (bodyData.invitedby !== 'null') && (bodyData.role) && (bodyData.role !== 'null')) {
        service.statusUpdateRequest(domain, person, bodyData, done);
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

function publishMessageToTopic4(domain) {
  let message = { domainname: domain };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('topic4', message, (err, res) => {
    if (err) {
      console.log('error occured', err);
    } else {
      console.log('result is', res);
    }
  });
}


function publishMessageToTopic5(domain) {
  let message = { domainname: domain };
  message = JSON.stringify(message);
  registerPublisherService.publishToTopic('topic5', message, (err, res) => {
    if (err) {
      console.log('error occured', err);
    } else {
      console.log('result is', res);
    }
  });
}


module.exports = {
  gettingValuesByDomain,
  InsertData,
  updateStatusInvite,
  updateStatusRequest,
  rejectedInviteRequest,

};
