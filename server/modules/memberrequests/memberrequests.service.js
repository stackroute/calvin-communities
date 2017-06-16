const model = require('cassandra-driver');

const connectionString = require('../../config');
const Invite_Request_Table = "invite_request";


const client = new model.Client({
    contactPoints: [connectionString.contact],
    protocolOptions: { port: connectionString.port },
    keyspace: connectionString.keyspace,
});

// Query for insert

function InsertData(data, done) {
    const query = (`INSERT INTO ${Invite_Request_Table} (id,email,domain,type,status,approver) VALUES('${data.id}','${data.email}','${data.domain}','${data.type}','${data.status}','${data.approver}')`);
    client.execute(query, err => done(err));
}


// Query for delete the rejected invite or request

function rejectedInviteRequest(data, done) {
    const query = (`DELETE from ${Invite_Request_Table} WHERE id = '${data}' IF EXISTS`);
    client.execute(query, err => done(err));
}

// Query for get the values for particular id

function gettingValuesById(data, done) {

    const query = (`SELECT * FROM ${Invite_Request_Table} WHERE id= '${data}' `);

    return client.execute(query, (err, result) => {
        if (!err) {
            console.log(result.rows)
            done(err, result.rows);
        } else {
            done(err, undefined);
        }
    });
}


// Query for Update status for type request

function statusUpdateRequest(id, bodyData, done) {
    const query = (`UPDATE ${Invite_Request_Table} SET status = '${bodyData.status}',approver = '${bodyData.approver}' WHERE id = '${id}'`);
    client.execute(query, (err) => done(err));
}

// Query for update status for type invite

function statusUpdateInvite(id, bodyData, done) {
    const query = (`UPDATE ${Invite_Request_Table} SET status = '${bodyData.status}' WHERE id = '${id}'`);
    client.execute(query, (err) => done(err));
}


module.exports = {
    gettingValuesById,
    InsertData,
    statusUpdateRequest,
    statusUpdateInvite,
    rejectedInviteRequest
};
