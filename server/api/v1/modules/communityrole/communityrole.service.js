const model = require('cassandra-driver');

const connectionString = require('../../../../config').connectionString;

const logger = require('../../../../logger');

const COMMUNITY_ROLE_TABLE = 'communityroles';

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

function getCommunityRoles(domainName, done) {
    // logger.debug("SERVICE getCommunityRolesOnly",domainName);
  const query = `SELECT * FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}'`; // SORT BY domainname, role`;

  return client.execute(query, (err, results) => {
    if (!err) {
      logger.debug(typeof results.rows);
      if (results.rows.length > 0) {
        done(err, results.rows);
      } else {
        logger.debug('error');
        done('please enter a existing domain', undefined);
      }
    } else {
      done(err, undefined);
    }
  });
}

function getCommunityRolesOnly(domainName, onlyroles, done) {
    // logger.debug("SERVICE getCommunityRolesOnly",domainName,"   ",onlyroles);
  const query = `SELECT role FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}'`; // SORT BY domainname, role`;
    // logger.debug(query);
  return client.execute(query, (err, results) => {
    if (!err) {
            // logger.debug("Inside getCommunityRolesOnly--------",results.rows.length);
            // const arr = [];
            // const result = '';

      if (results.rows.length > 0) {
                // logger.debug("helllllo");

                // logger.debug("OBJECT VALUE:", results.rows);
                // logger.debug("Stringified object value", JSON.stringify(results.rows));
                /* const newArr = results.rows.filter((value, index, self) => {
            logger.debug('value', value);
            logger.debug('sefl', self);
            logger.debug('self.indexOf(value) === index', self.indexOf(value) === index);
            // logger.debug('value', value, 'index', index, 'self', self);
            return self.indexOf(value) === index;

          });

          logger.debug('newArr', newArr);
          results.rows.forEach(function(data){

          logger.debug('my unique array', Array.from(new Set(data)));
        }*/

                // for(obj in results.rows)
                // {
                //   logger.debug(obj);
                // }

                // logger.debug('results.rows', results.rows)

        const unique = [...new Set(results.rows.map(item => item.role))];
                // logger.debug('unique', unique)

        const finalArr = [];

        unique.forEach((item) => {
          const obj = {};
                    // logger.debug("item is",item);
          obj.role = item;
          logger.debug('obj', obj);
          finalArr.push(obj);
          logger.debug('finalArr', finalArr);
        });

        done(null, finalArr);
                // logger.debug(finalArr);


                // results.rows.forEach(function(data){
                //   logger.debug("DATA",data);
                //   logger.debug("DATA stringified", JSON.stringify(data));
                //   arr.push(JSON.stringify(data));
                // });

                // arr.push(JSON.stringify(results.rows));
                // arr=Array.from(new Set(arr));
                // logger.debug("RANDOM COMMAND",arr);
                // result = result+arr;
                // logger.debug('result', result);
                // logger.debug(JSON.parse(result));
                // logger.debug("FINAL RESULT VALUE IS", result);
                // result=result;
                /* JSON.parse(JSON.stringify(result));*/
                // logger.debug("JSON PARSE",JSON.parse(result));
                // logger.debug("FINAL RESULT VALUE",result);
                // done(undefined, [result]);
      } else {
                // logger.debug('error');
        done('please enter a existing domain', undefined);
      }
    } else {
            // logger.debug("last else");
      done(err, undefined);
    }
  });
}

// function getCommunityRoles(domainName, done) {
//   logger.debug("inside service");
//   const query = `SELECT role FROM ${COMMUNITY_ROLE_TABLE} WHERE /
// domain = '${domainName.toLowerCase()}'`; // SORT BY domainname, role`;

//   return client.execute(query, (err, results) => {
//     if (!err) {
//       logger.debug(results.rows.length);
//       if(results.rows.length>0){
//       done(err, results.rows);
//     }
//     else{
//       logger.debug("error");
//       done("please enter a existing domain",undefined);    }
//   }else {
//       done(err, undefined);
//     }
//   });
// }

function checkCommunityRole(domainName, role, toolid, done) {
  logger.debug('Inside checkCommunityRole');
  logger.debug(`domainName:${domainName} role:${role} toolid ${toolid}`);
  const query = `SELECT * FROM ${COMMUNITY_ROLE_TABLE} WHERE domain = '${domainName.toLowerCase()}' AND role='${role.toLowerCase()}' AND toolid='${toolid.toLowerCase()}'`; // SORT BY domainname, role`;
  logger.debug('checkCommunityRole before query.execute');
  return client.execute(query, (err, results) => {
    logger.debug(`checkCommunityRole after query.execute${results}`);
    if (!err) {
      if (results.rows.length > 0) {
        done(err, results.rows);
      } else {
        logger.debug('error');
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
  logger.debug('Inside postCommunityRoles service');

  let query;
  postedData.forEach((data) => {
    logger.debug('actions ', data.actions);

    let actions = '';
    Object.keys(data.actions).forEach((key) => {
      const value = data.actions[key];
      actions += `'${key}':'${value}' ,`;
            // actions = actions.substring(0, actions.lastIndexOf(","));
    });
    actions = actions.substring(0, actions.lastIndexOf(','));
    actions = `{${actions}}`;
    logger.debug('Actions full string', actions);

    query = `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid, createdon, updatedon)
     VALUES ( '${domainName.toLowerCase()}' , '${data.role.toLowerCase()}' , ${actions.toLowerCase()} , '${data.toolId.toLowerCase()}', dateof(now()), dateof(now()) )`;
        // let params = [data.domain, data.role, data.actions, data.toolId];
    logger.debug(data.actions);
    const d = {
      query,
    };
    logger.debug(d);
    arr.push(d);
    logger.debug('data', data);
  });
  logger.debug(`Array:${arr}`);
  return client.batch(arr, { prepare: true }, (err, results) => {
    if (!err) {
      logger.debug('no error');
      done(undefined, results.rows);
    } else {
      logger.debug('err:', err);
      done(err, undefined);
    }
  });
}

/* function postCommunityRoles(postedData, done) {
  const arr = [];
  logger.debug('Inside postCommunityRoles service');

  let query;
  postedData.forEach((data) => {
    logger.debug('actions ', data.actions);

    let actions = '';
    Object.keys(data.actions).forEach((key) => {
      const value = data.actions[key];
      actions += `'${key}':'${value}' ,`;
      // actions = actions.substring(0, actions.lastIndexOf(","));
    });
    actions = actions.substring(0, actions.lastIndexOf(','));
    actions = `{${actions}}`;
    logger.debug('Actions full string', actions);

    query = `INSERT INTO ${COMMUNITY_ROLE_TABLE}
     (domain, role, actions, toolid, createdon, updatedon)
     VALUES ( '${data.domain.toLowerCase()}' ,
     '${data.role.toLowerCase()}' , ${actions.toLowerCase()} ,
     '${data.toolId.toLowerCase()}', dateof(now()), dateof(now()) )`;
    // let params = [data.domain, data.role, data.actions, data.toolId];
    logger.debug(data.actions);
    const d = {
      query,
    };
    logger.debug(d);
    arr.push(d);
    logger.debug('data', data);
  });
  logger.debug(`Array:${arr}`);
  return client.batch(arr, { prepare: true }, (err, results) => {
    if (!err) {
      logger.debug('no error');
      done(undefined, results.rows);
    } else {
      logger.debug('err:', err);
      done(err, undefined);
    }
  });
}*/


/* function postCommunityRoles(postedData, done) {
  let arr=[];
  logger.debug("Inside post")

  const query = `INSERT INTO ${COMMUNITY_ROLE_TABLE} (domain, role, actions, toolid) VALUES
  /( ? , ? , ? , ? )`; // SORT BY domainname, role`;
  logger.debug("After query");
  postedData.forEach(function(data){
    let params = [data.domain, data.role, data.actions, data.toolId];
    let d = {
      query: query,
      params: params
    }
    logger.debug(d);
    arr.push(d);
    logger.debug("data", data);
  })
  logger.debug("Array:"+arr);
  return client.batch(arr, { hints: ['text', 'text', 'map', 'text'] }, (err, results) => {
    if (!err) {
      logger.debug("no error");
      done(undefined, results.rows);
    } else {
      logger.debug('err:', err )
      done(err, undefined);
    }
  });
}*/
/* function patchCommunityRoles(values, done) {
  logger.debug('Values from Patch service',typeof values," and its value is");
 let actions = '';
 let str = '';
 logger.debug("Object.keys(values[0].actions)",Object.keys(values[0]));
    Object.keys(values[0]).forEach((key) => {
      logger.debug('KEYS', key);
      logger.debug('value', values[0][key]);
      let value = values[0][key];
      logger.debug("KEY",key," value:",value);
      str += `'${key}':'${values[0][key]}' ,`;
     // actions += `'${key}.toLowerCase()':'${value}.toLowerCase()' ,`;
      // actions = actions.substring(0, actions.lastIndexOf(","));
    });
    logger.debug("STRING",str);
    str=str.toLowerCase();
    str = str.substring(0, str.lastIndexOf(','));
    str = `{${str}}`;
    values[0]= str;
    logger.debug("STR FINALLY",str);
    logger.debug("PRAKHAR",values);
    logger.debug("typeof values[0]",typeof values[0]);
    for(obj in values)
    {
      logger.debug("obj");
    }

    //actions = actions.substring(0, actions.lastIndexOf(','));
    //actions = `{${actions}}`;
    logger.debug('Actions full string from patchCommunityRoles NEW ONE', actions);
  const query = (`UPDATE ${COMMUNITY_ROLE_TABLE} SET actions = actions + ?,
  updatedon=dateof(now()) where domain = ? AND role=? and toolid=?`); // SORT BY domainname, role`;
  return client.execute(query, values, (err, results) => {

    if (!err) {
      logger.debug("PATCH QUERY EXECUTED");
      done(err, results.rows);
    } else {
      logger.debug("PATCH QUERY ERROR", err);
      done(err, undefined);
    }
  });
}*/

function patchCommunityRoles(values, done) {
  logger.debug('Values from Patch service', values);

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
        logger.debug('error');
        done('undefined', undefined);
      } else {
        logger.debug('pass');
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
