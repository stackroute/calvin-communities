const model = require('cassandra-driver');

const connectionString = require('../../../../config');
const Invite_Request_Table = "memberrequest";


const client = new model.Client({
    contactPoints: [connectionString.contact],
    protocolOptions: { port: connectionString.port },
    keyspace: connectionString.keyspace,
});

// Query for insert

function InsertData(data, done) {
    let length = data.person.length;
    let error;
    let res;
    for (let i=0;i<length;i++)
    {
    const query = (`INSERT INTO ${Invite_Request_Table} (domain,person,member,status,type) VALUES('${data.domain}','${data.person[i]}','${data.member}','${data.status}','${data.type}')`);
    client.execute(query, (err,result)=>{
        error+=err
        res+=result;
    }); 
}
done(error,res);
}


// Query for delete the rejected invite or request

function rejectedInviteRequest(domain,person, done) {
    const query = (`DELETE from ${Invite_Request_Table} WHERE domain = '${domain}' AND person = '${person}' `);
    client.execute(query, err => done(err));
}

// Query for get the values for particular domain and person

function gettingValuesByDomainPerson(domain,person, done) {
    const query = (`SELECT * FROM ${Invite_Request_Table} WHERE domain = '${domain}' AND person = '${person}' `);
    return client.execute(query, (err, result) => {
        if (!err) {
            done(err, result.rows);
        } else {
            done(err, undefined);
        }
    });
}


// Query for get the values for particular domain

function gettingValuesByDomain(domain, done) {
    const query = (`SELECT * FROM ${Invite_Request_Table} WHERE domain = '${domain}' `);

    return client.execute(query, (err, result) => {
        if (!err) {
            console.log(result.rows)
            done(err, result.rows);
        } else {id
            done(err, undefined);
        }
    });
}



// Query for Update status for type request

function statusUpdateRequest(params, bodyData, done) {
    const query = (`UPDATE ${Invite_Request_Table} SET status = '${bodyData.status}',member = '${bodyData.member}' WHERE domain = '${params.domain}' AND person = '${params.person}'`);
    client.execute(query, (err) => done(err));
}

// Query for update status for type invite

function statusUpdateInvite(params, bodyData, done) {
    const query = (`UPDATE ${Invite_Request_Table} SET status = '${bodyData.status}' WHERE domain = '${params.domain}' AND person = '${params.person}'`);
    client.execute(query, (err) => done(err));
}


module.exports = {
    gettingValuesByDomainPerson,
    InsertData,
    statusUpdateRequest,
    statusUpdateInvite,
    rejectedInviteRequest,
    gettingValuesByDomain
};
