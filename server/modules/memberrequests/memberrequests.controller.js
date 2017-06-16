const model = require('cassandra-driver');
const service = require('./memberrequests.service');

const statusstring = [
    'approved', 'invitesent', 'accepted', 'requested',
];


// Getting the table details for particular id

function gettingValuesById(id, done) {
    service.gettingValuesById(id, done);
}


// Inviting the values into the table for both request and invite

function InsertData(values, done) {
    let flag = false;
    if ((values.email) && (values.domain)) {
        if (values.email !== null && values.domain !== null) {
            statusstring.forEach((a) => {
                if (values.status.includes(a)) {
                    flag = true;
                }
            });
        }
    }

    if (flag) {
        const params = {
            email: values.email,
            domain: values.domain,
            status: values.status,
            type: values.type,
            approver: values.approver,
            id: model.types.Uuid.random().toString().split('-').join(''),
        };

        service.InsertData(params, done);
    } else {
        done('enter proper value !!');
    }
}

// Upadate the status for both request and invite

function updateStatus(id, bodyData, done) {
    let flag = false;
    service.gettingValuesById(id, (error, result) => {
        if (error) done("error in getting type for the given id");

        const inviteType = result[0].type;

        if ((id) && (id !== null) && (bodyData.status) && (bodyData.status !== null)) {
            statusstring.forEach((a) => {
                if (bodyData.status.includes(a)) {
                    flag = true;
                }
            });
        }

        if (flag) {

            if ((bodyData.status === 'approved') && (inviteType === 'request')) {

                if ((bodyData.approver) && bodyData.approver !== null) {

                    service.statusUpdateRequest(id, bodyData, done);
                } else done('approver sholud not be empty');

            } else if (((bodyData.status === 'accepted') || (bodyData.status === 'resent')) && (inviteType === 'invite')) {

                service.statusUpdateInvite(id, bodyData, done);

            } else done('check type of that id and status value!!');

        } else done('id and status should be in correct format!!');
    });
}

// Deleting the id in the table when the request or invite is rejected

function rejectedInviteRequest(id, done) {
    if ((id) && (id !== null)) {
        service.rejectedInviteRequest(id, done);
    } else {
        done('id should not be empty!!');
    }
}



module.exports = {
    gettingValuesById,
    InsertData,
    updateStatus,
    rejectedInviteRequest

};
