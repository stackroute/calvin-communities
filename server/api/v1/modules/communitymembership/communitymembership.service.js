const model = require('cassandra-driver');

const connectionString = require('../../../../config');

const COMMUNITY_MEMBERSHIP_TABLE = 'communitymembership';

const client = new model.Client({
    contactPoints: [connectionString.contact],
    protocolOptions: { port: connectionString.port },
    keyspace: connectionString.keyspace,
});


function addMembersToCommunity(domainName, data, done) {
    const arr = [];
    const query = (`INSERT INTO ${COMMUNITY_MEMBERSHIP_TABLE} (username,domain,role,createdon,updatedon) values(?,?,?,dateof(now()),dateof(now()))`);
    data.forEach((val) => {
        arr.push({ query, params: [val.username, domainName.toLowerCase(), val.role.toLowerCase()] });
    });
    return client.batch(arr, { prepare: true }, (err) => {
        if (!err) {
            console.log("no error");
            done(undefined, 'results.rows');
        } else {
            console.log(err);
            done(err, undefined);
        }

    });
}

function removeMembersFromCommunity(domainName, data, done) {
    console.log('hi');
    const arr = [];
    const query = (`DELETE FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE username =? AND domain = ?  IF EXISTS`);
    data.forEach((val) => {
        arr.push({ query, params: [val.username, domainName.toLowerCase()] });
    });
    return client.batch(arr, { prepare: true }, (err) => {
        if (!err) {
            console.log("no error");
            done(undefined, 'results.rows');
        } else {
            console.log(err);
            done(err, undefined);
        }

    });
}


//Update role of members in a community

function modifyRoleOfMembersFromCommunity(domainName, data, done) {
    console.log('you can modify role');
    const arr = [];
    const query = (`UPDATE ${COMMUNITY_MEMBERSHIP_TABLE} SET role =? ,updatedon = dateof(now()) WHERE domain =? AND username =? IF EXISTS `);
    data.forEach((val) => {
        arr.push({ query, params: [val.role.toLowerCase(), domainName.toLowerCase(),val.username] });
    });
    console.log(query);
    return client.batch(arr, { prepare: true }, (err,message) => {
        console.log(query);
        if (!err) {
            console.log("no error");
            done(undefined, {message : 'Role Modified'});
        } else {
            console.log(err);
            done(err, undefined);
        }

    });
}


// Get particular Community members
function checkCommunityToUpdateMembersDetail(domainName, userName, memberRole, done) {
    const query = `SELECT domain,username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain = '${domainName.toLowerCase()}' AND username = '${userName}' AND role='${memberRole.toLowerCase()}' ALLOW FILTERING`;
    return client.execute(query, (err, results) => {
        if (!err) {
            if (results.rows.length > 0) {
                done(undefined, {message :'User Exist you can modify the data'});
            } else {
                done({ error: 'Please enter a valid domain and username name' }, undefined);
            }
        } else {
            done({ error: 'Internal Error occured' }, undefined);
        }
    });
}



// Get particular Community members Details


function getParticularCommunityMembersDetails(domainName, done) {
    const query = `SELECT username,role FROM ${COMMUNITY_MEMBERSHIP_TABLE} WHERE domain = '${domainName.toLowerCase()}' `;
  console.log(query);
  return client.execute(query, (err, results) => {
    console.log(query);
    if (!err) {
      done(undefined, {domain:domainName,MemberDetails: results.rows});
    } else {
      done(err, undefined);
    }
  })
}

module.exports = {
    addMembersToCommunity,
    removeMembersFromCommunity,
    modifyRoleOfMembersFromCommunity,
    getParticularCommunityMembersDetails,
    checkCommunityToUpdateMembersDetail,
};
