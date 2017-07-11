const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const logger = require('../../../../logger');

const MEMBERSHIP_TABLE = 'membership';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


/*
 * Get community Details of a particular member
 */

function getCommunityList(username, done) {
  const query = `SELECT domain, role FROM membership WHERE username = '${username}' `;
  return client.execute(query, (err, results) => {
    if (!err) {
      done(undefined, { username, communityDetails: results.rows });
    } else {
      done(err, undefined);
    }
  });
}

// function getAvatarForCommunities(username, done) {
//   console.log("Avtar");
//   const arr =[];
//   const query = `SELECT domain FROM membership WHERE username = '${username}'`;
//   return client.execute(query, (err, results) => {
//     if(!err) {
//       console.log(results.rows);
//       results.rows.forEach(function(data){
//         console.log("data", data);
//         arr.push(data.domain);
//       })
//       done(undefined, arr);
//     } else {
//       done(err, undefined);
//     }
//   });
// }

/*
 * Post - Add memebers to the community
 */

function userCommunityDetails(domainName, data, done) {
  const arr = [];
  const query = (`INSERT INTO ${MEMBERSHIP_TABLE} (username,domain,role,createdon,updatedon)
                  values(?,?,?,dateof(now()),dateof(now()))`);
  data.forEach((value) => {
    const user = value.username.toLowerCase();
    // console.log("user",user);
    arr.push({ query, params: [user, domainName.toLowerCase(), value.role.toLowerCase()] });
  });

  logger.debug('Member to be added');
  return client.batch(arr, { prepare: true }, (err, res) => {
    if (err) {
      return done(err);
    }
    // data.forEach((value) => {})
    return done(null, res);
  });
}

// get details for deletion and updation
function getDetailsForDeletionAndUpdation(domainName, data, done) {
  let count = false;
  const query = (`SELECT domain, role from ${MEMBERSHIP_TABLE} WHERE domain=? AND username = ?`);
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        const arr = results.rows[0];
        arr.forEach((val) => {
          if (val === data) {
            count = true;
          }
        });
      }
      if (count) {
        done(undefined, results);
      } else {
        done({ error: 'please enter a valid username' }, undefined);
      }
    } else {
      done({ error: 'Internal error' }, undefined);
    }
  });
}
/*
 *  Patch - Modify role of a member in a community
 */

function modifyRoleOfMemberInCommunity(domainName, data, done) {
  const arr = [];
  const query = (`UPDATE ${MEMBERSHIP_TABLE} SET role =? ,updatedon = dateof(now()) WHERE domain =? AND username =? `);
  data.forEach((val) => {
    arr.push({ query, params: [val.role.toLowerCase(), domainName, val.username] });
  });
  return client.batch(arr, { prepare: true }, (err, res) => {
    if (err) {
      return done(err);
    }
    return done(undefined, res);
  });
}

/*
 * Delete- Remove member from a community
 */

function removeMemberFromCommunity(domainName, data, done) {
  const arr = [];
  const query = (`DELETE FROM ${MEMBERSHIP_TABLE} WHERE username =? AND domain = ? `);
  data.forEach((val) => {
    arr.push({ query, params: [val.username, domainName] });
  });
  return client.batch(arr, { prepare: true }, (err, res) => {
    if (err) {
      return done(err);
    }
    return done(undefined, res);
  });
}


module.exports = {
  userCommunityDetails,
  getCommunityList,
  modifyRoleOfMemberInCommunity,
  removeMemberFromCommunity,
  getDetailsForDeletionAndUpdation,
  // getAvatarForCommunities,
};
