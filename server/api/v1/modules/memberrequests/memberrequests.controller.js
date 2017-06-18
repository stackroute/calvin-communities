const model = require('cassandra-driver');
const service = require('./memberrequests.service');

const statusstring = [
    'approved', 'invitesent', 'accepted', 'requested', 'resent'
];


// Getting the table details for particular id

function gettingValuesByDomain(domain, done) {
    console.log("in controller",domain)
    service.gettingValuesByDomain(domain, done);
}


// Inviting the values into the table for both request and invite

function InsertData(values, done) {
    let flag = false;
    if ((values.person.length>0) && (values.domain)) {
        if (values.domain !== null) {
            statusstring.forEach((a) => {
                if (values.status.includes(a)) {
                    flag = true;
                }
            });
        }
    }

    if (flag) {
            service.InsertData(values, done);
        }
        
     else {
        done('enter proper value !!');
    }
}

// Upadate the status for both request and invite

function updateStatus(params, bodyData, done) {
    let flag = false;
    
    service.gettingValuesByDomainPerson(params.domain,params.person ,(error, result) => {
        if (error) done("error in getting type for the given domain");
        const inviteType = result[0].type;
        if ((bodyData.status) && (bodyData.status !== null)) {
            statusstring.forEach((a) => {
                if (bodyData.status.includes(a)) {
                    flag = true;
                }
            });
        }

        if (flag) {

            if ((bodyData.status === 'approved') && (inviteType === 'request')) {

                if ((bodyData.member) && bodyData.member !== null) {

                    service.statusUpdateRequest(params, bodyData, done);
                } else done('approver sholud not be empty');

            } else if (((bodyData.status === 'accepted') || (bodyData.status === 'resent')) && (inviteType === 'invite')) {

                service.statusUpdateInvite(params, bodyData, done);

            } else done('check type of that id and status value!!');

        } else done('id and status should be in correct format!!');
    });
} 

// Deleting the row in the table when the request or invite is rejected

function rejectedInviteRequest(domain,person, done) {
    if ((domain) && (domain !== null)) {
        service.rejectedInviteRequest(domain,person, done);
    } else {
        done('domain should not be empty!!');
    }
}



module.exports = {
    gettingValuesByDomain,
    InsertData,
    updateStatus,
    rejectedInviteRequest

};
