const model = require('cassandra-driver');
const connectionString = require('../../../../config').connectionString;

const COMMUNITY_ROLE_TABLE = 'communityroles';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function getCommunityRoles(domainName, done) {
    // console.log("SERVICE getCommunityRolesOnly",domainName);
  const query = `SELECT * FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}'`; // SORT BY domainname, role`;

  return client.execute(query, (err, results) => {
    if (!err) {
      console.log(typeof results.rows);
      if (results.rows.length > 0) {
        done(err, results.rows);
      } else {
        console.log('error');
        done('please enter a existing domain', undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}

function getCommunityRolesOnly(domainName, onlyroles, done) {
    // console.log("SERVICE getCommunityRolesOnly",domainName,"   ",onlyroles);
  const query = `SELECT role FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}'`; // SORT BY domainname, role`;
    // console.log(query);
  return client.execute(query, (err, results) => {
    if (!err) {
            // console.log("Inside getCommunityRolesOnly--------",results.rows.length);
            // const arr = [];
            // const result = '';

      if (results.rows.length > 0) {
                // console.log("helllllo");

                // console.log("OBJECT VALUE:", results.rows);
                // console.log("Stringified object value", JSON.stringify(results.rows));
                /* const newArr = results.rows.filter((value, index, self) => {
            console.log('value', value);
            console.log('sefl', self);
            console.log('self.indexOf(value) === index', self.indexOf(value) === index);
            // console.log('value', value, 'index', index, 'self', self);
            return self.indexOf(value) === index;

          });

          console.log('newArr', newArr);
          results.rows.forEach(function(data){

          console.log('my unique array', Array.from(new Set(data)));
        }*/

                // for(obj in results.rows)
                // {
                //   console.log(obj);
                // }

                // console.log('results.rows', results.rows)

        const unique = [...new Set(results.rows.map(item => item.role))];
                // console.log('unique', unique)

        const finalArr = [];

        unique.forEach((item) => {
          const obj = {};
                    // console.log("item is",item);
          obj.role = item;
          console.log('obj', obj);
          finalArr.push(obj);
          console.log('finalArr', finalArr);
        });

        done(null, finalArr);
                // console.log(finalArr);


                // results.rows.forEach(function(data){
                //   console.log("DATA",data);
                //   console.log("DATA stringified", JSON.stringify(data));
                //   arr.push(JSON.stringify(data));
                // });

                // arr.push(JSON.stringify(results.rows));
                // arr=Array.from(new Set(arr));
                // console.log("RANDOM COMMAND",arr);
                // result = result+arr;
                // console.log('result', result);
                // console.log(JSON.parse(result));
                // console.log("FINAL RESULT VALUE IS", result);
                // result=result;
                /* JSON.parse(JSON.stringify(result));*/
                // console.log("JSON PARSE",JSON.parse(result));
                // console.log("FINAL RESULT VALUE",result);
                // done(undefined, [result]);
      } else {
                // console.log('error');
        done('please enter a existing domain', undefined);
      }
    } else {
            // console.log("last else");
      done(err, undefined);
    }
  });
}

// function getCommunityRoles(domainName, done) {
//   console.log("inside service");
//   const query = `SELECT role FROM ${COMMUNITY_ROLE_TABLE} WHERE /
// domain = '${domainName.toLowerCase()}'`; // SORT BY domainname, role`;

//   return client.execute(query, (err, results) => {
//     if (!err) {
//       console.log(results.rows.length);
//       if(results.rows.length>0){
//       done(err, results.rows);
//     }
//     else{
//       console.log("error");
//       done("please enter a existing domain",undefined);    }
//   }else {
//       done(err, undefined);
//     }
//   });
// }

function checkCommunityRole(domainName, role, toolid, done) {
  console.log('Inside checkCommunityRole');
  console.log(`domainName:${domainName} role:${role} toolid ${toolid}`);
  const query = `SELECT * FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}' AND role='${role.toLowerCase()}' AND toolid='${toolid.toLowerCase()}'`; // SORT BY domainname, role`;
  console.log('checkCommunityRole before query.execute');
  return client.execute(query, (err, results) => {
    console.log(`checkCommunityRole after query.execute${results}`);
    if (!err) {
      if (results.rows.length > 0) {
        done(err, results.rows);
      } else {
        console.log('error');
        done('already existing ', undefined);
      }
    } else {
      done({ error: 'entry already exists' }, undefined);
    }
  });
}

function checkCommunityRole2(domainName, role, done) {
  const query = `SELECT * FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}' AND role='${role.toLowerCase()}'`; // SORT BY domainname, role`;
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        done(undefined, results.rows);
      } else {
        done('Patch for only existing data possible ', undefined);
      }
    } else {
      done({ error: 'Patch for only existing data possible' }, undefined);
    }
  });
}


function postCommunityRoles(domainName, postedData, done) {
  const arr = [];
  console.log('Inside postCommunityRoles service');

  let query;
  postedData.forEach((data) => {
    console.log('actions ', data.actions);

    let actions = '';
    Object.keys(data.actions).forEach((key) => {
      const value = data.actions[key];
      actions += `'${key}':'${value}' ,`;
            // actions = actions.substring(0, actions.lastIndexOf(","));
    });
    actions = actions.substring(0, actions.lastIndexOf(','));
    actions = `{${actions}}`;
    console.log('Actions full string', actions);

    query = `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid, createdon, updatedon)
     VALUES ( '${domainName.toLowerCase()}' , '${data.role.toLowerCase()}' , ${actions.toLowerCase()} , '${data.toolId.toLowerCase()}', dateof(now()), dateof(now()) )`;
        // let params = [data.domain, data.role, data.actions, data.toolId];
    console.log(data.actions);
    const d = {
      query,
    };
    console.log(d);
    arr.push(d);
    console.log('data', data);
  });
  console.log(`Array:${arr}`);
  return client.batch(arr, { prepare: true }, (err, results) => {
    if (!err) {
      console.log('no error');
      done(undefined, results.rows);
    } else {
      console.log('err:', err);
      done(err, undefined);
    }
  });
}

/* function postCommunityRoles(postedData, done) {
  const arr = [];
  console.log('Inside postCommunityRoles service');

  let query;
  postedData.forEach((data) => {
    console.log('actions ', data.actions);

    let actions = '';
    Object.keys(data.actions).forEach((key) => {
      const value = data.actions[key];
      actions += `'${key}':'${value}' ,`;
      // actions = actions.substring(0, actions.lastIndexOf(","));
    });
    actions = actions.substring(0, actions.lastIndexOf(','));
    actions = `{${actions}}`;
    console.log('Actions full string', actions);

    query = `INSERT INTO ${COMMUNITY_ROLE_TABLE}
     (domain, role, actions, toolid, createdon, updatedon)
     VALUES ( '${data.domain.toLowerCase()}' ,
     '${data.role.toLowerCase()}' , ${actions.toLowerCase()} ,
     '${data.toolId.toLowerCase()}', dateof(now()), dateof(now()) )`;
    // let params = [data.domain, data.role, data.actions, data.toolId];
    console.log(data.actions);
    const d = {
      query,
    };
    console.log(d);
    arr.push(d);
    console.log('data', data);
  });
  console.log(`Array:${arr}`);
  return client.batch(arr, { prepare: true }, (err, results) => {
    if (!err) {
      console.log('no error');
      done(undefined, results.rows);
    } else {
      console.log('err:', err);
      done(err, undefined);
    }
  });
}*/


/* function postCommunityRoles(postedData, done) {
  let arr=[];
  console.log("Inside post")

  const query = `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid) VALUES
  /( ? , ? , ? , ? )`; // SORT BY domainname, role`;
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
/* function patchCommunityRoles(values, done) {
  console.log('Values from Patch service',typeof values," and its value is");
 let actions = '';
 let str = '';
 console.log("Object.keys(values[0].actions)",Object.keys(values[0]));
    Object.keys(values[0]).forEach((key) => {
      console.log('KEYS', key);
      console.log('value', values[0][key]);
      let value = values[0][key];
      console.log("KEY",key," value:",value);
      str += `'${key}':'${values[0][key]}' ,`;
     // actions += `'${key}.toLowerCase()':'${value}.toLowerCase()' ,`;
      // actions = actions.substring(0, actions.lastIndexOf(","));
    });
    console.log("STRING",str);
    str=str.toLowerCase();
    str = str.substring(0, str.lastIndexOf(','));
    str = `{${str}}`;
    values[0]= str;
    console.log("STR FINALLY",str);
    console.log("PRAKHAR",values);
    console.log("typeof values[0]",typeof values[0]);
    for(obj in values)
    {
      console.log("obj");
    }

    //actions = actions.substring(0, actions.lastIndexOf(','));
    //actions = `{${actions}}`;
    console.log('Actions full string from patchCommunityRoles NEW ONE', actions);
  const query = (`UPDATE ${COMMUNITY_ROLE_TABLE} SET actions = actions + ?,
  updatedon=dateof(now()) where domain = ? AND role=? and toolid=?`); // SORT BY domainname, role`;
  return client.execute(query, values, (err, results) => {

    if (!err) {
      console.log("PATCH QUERY EXECUTED");
      done(err, results.rows);
    } else {
      console.log("PATCH QUERY ERROR", err);
      done(err, undefined);
    }
  });
}*/

function patchCommunityRoles(values, done) {
  console.log('Values from Patch service', values);

  const query = (`UPDATE ${COMMUNITY_ROLE_TABLE} SET actions = actions + ?, updatedon=dateof(now()) where domain = ? AND role=? and toolid=?`); // SORT BY domainname, role`;
  return client.execute(query, values, { hints: ['map', 'text', 'text', 'text'] }, (err, results) => {
    if (!err) {
      done(err, results.rows);
    } else {
      done(err, undefined);
    }
  });
}

function communityToolsServiceToDeleteTool(domainName, toolId, done) {
  const query = `SELECT toolid FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}' and toolid = '${toolId.toLowerCase()}' ALLOW FILTERING`; // SORT BY domainname, toolid`;
  return client.execute(query, (err, results) => {
    if (!err) {
      if (results.rows.length > 0) {
        console.log('error');
        done('undefined', undefined);
      } else {
        console.log('pass');
        done(undefined, 'undefined');
      }
    } else {
      done(err, undefined);
    }
  });
}

function communityToolsServiceToDeleteAction(domainName, toolId, action, done) {
  const query = `SELECT actions FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}' and toolid = '${toolId.toLowerCase()}' ALLOW FILTERING`; // SORT BY domainname, role`;

  return client.execute(query, (err, results) => {
    let flag = 0;
    if (!err) {
      if (results.rows.length > 0) {
        const val = Object.values(results.rows[0]);
        Object.keys(val[0]).forEach((key) => {
          if (key === action) {
            flag = 1;
          }
        });
        done(undefined, flag);
      } else {
        done(undefined, flag);
      }
    } else {
      done(err, undefined);
    }
  });
}


module.exports = {
  getCommunityRoles,
  postCommunityRoles,
  patchCommunityRoles,
  checkCommunityRole,
  checkCommunityRole2,
  getCommunityRolesOnly,
  communityToolsServiceToDeleteAction,
  communityToolsServiceToDeleteTool,
};
