const model = require('cassandra-driver');
const connectionString = require('../../../../config');

const COMMUNITY_ROLE_TABLE = 'communityroles';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function getCommunityRoles(domainName, done) {
  const query = `SELECT * FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName}'`; // SORT BY domainname, role`;

  return client.execute(query, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

function postCommunityRoles(postedData, done) {
  let arr = [];
  console.log("Inside post")

  let query; //= `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid) VALUES ( ? , ? , ? , ? )`; // SORT BY domainname, role`;
  postedData.forEach(function(data) {
    console.log("actions ", data.actions);

    let actions = "";
    Object.keys(data.actions).forEach((key) => {
      let value = data.actions[key];
      actions = actions + `'${key}':'${value}' ,`;
     // actions = actions.substring(0, actions.lastIndexOf(","));

    });
    actions = actions.substring(0, actions.lastIndexOf(","));
    actions="{"+actions+"}";
    console.log("Actions full string", actions);

    query = `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid)
     VALUES ( '${data.domain}' , '${data.role}' , ${actions} , '${data.toolId}' )`; // SORT BY domainname, role`;
    //let params = [data.domain, data.role, data.actions, data.toolId];
    console.log(data.actions)
    let d = {
      query: query
    }
    console.log(d);
    arr.push(d);
    console.log("data", data);
  })
  console.log("Array:" + arr);
  return client.batch(arr, { prepare: true }, (err, results) => {
    if (!err) {
      console.log("no error");
      done(undefined, results.rows);
    } else {
      console.log('err:', err)
      done(err, undefined);
    }
  });
}
/*function postCommunityRoles(postedData, done) {
  let arr=[];
  console.log("Inside post")

  const query = `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid) VALUES ( ? , ? , ? , ? )`; // SORT BY domainname, role`;
  console.log("After query");
  postedData.forEach(function(data){
    let params = [data.domain, data.role, data.actions, data.toolId];
    let d = {
      query: query,
      params: params
    }
    console.log(d);
    arr.push(d);
    console.log("data", data);
  })
  console.log("Array:"+arr);
  return client.batch(arr, { hints: ['text', 'text', 'map', 'text'] }, (err, results) => {
    if (!err) {
      console.log("no error");
      done(undefined, results.rows);
    } else {
      console.log('err:', err )
      done(err, undefined);
    }
  });
}*/

function patchCommunityRoles(values, done) {
  const query = (`UPDATE ${COMMUNITY_ROLE_TABLE} SET actions = actions + ?, toolid = ? where domain = ? AND role=?`); // SORT BY domainname, role`;
  return client.execute(query, values, { hints: ['map', 'text', 'text', 'text'] }, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

module.exports = {
  getCommunityRoles,
  postCommunityRoles,
  patchCommunityRoles,
};