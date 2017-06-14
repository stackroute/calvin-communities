const model = require('cassandra-driver');

const connectionString = require('../../connect');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


function postTools(req, res) {
  try{
  const query = ('insert into tools (domain,toolid,actions,activityevents) values(\'' + req.body.domain + '\',\'' + req.body.id + '\',{' + req.body.action + '},{' + req.body.events + '})');
  const param = [req.body.events];
  console.log(param);
  res.send(param + ' added');
  client.execute(query, (err, result) => {
    if (err) throw console.log(err);
    console.log(result);
  });
}
catch(err){
        res.send({error: "Unexpected internal error occurred, please try later...!"});
}
}

function getTools(req, res) {
  try{
  const query = ('SELECT * from tools');
  console.log('Got values!!');
  client.execute(query, (err, result) => {
    if (err) throw console.log(err, result);
    console.log('success');
    res.send(result.rows);
  });
}
catch(err){
        res.send({error: "Unexpected internal error occurred, please try later...!"});
}
}

function modifyTool(req, res) {
  try{
  const query = ('UPDATE tools SET actions=actions+{\'' + req.body.action + '\'},activityevents=activityevents+{\'' + req.body.events + '\'} where domain=\'' + req.params.id + '\'');
  const params = [req.body.action,req.body.events,req.params.id];
  console.log(params);
  res.send(params + ' added');
  client.execute(query, (err) => {
    if (err) throw console.log(err);
    console.log('success');
  });
}
  catch(err){
        res.send({error: "Unexpected internal error occurred, please try later...!"});
}
}

function deleteAction(req, res) {
  try{
  const query = ('DELETE actions[?] FROM tools where domain=?');
  const params = [req.params.index,req.params.id];
  res.status(202).send( ' deleted');
  client.execute(query,params, (err) => {
    if (err) throw console.log(err);
    console.log('success');
  });
}
catch(err){
        res.send({error: "Unexpected internal error occurred, please try later...!"});
}
}
function deleteEvent(req, res) {
  try{
  const query = ('DELETE activityevents[?] FROM tools where domain=?');
  const params = [req.params.index,req.params.id];
  res.status(202).send(req.body.index + ' deleted');
  client.execute(query,params, (err, result) => {
    if (err) throw console.log(err);
    console.log(result);
  });}
  catch(err){
        res.send({error: "Unexpected internal error occurred, please try later...!"});
}
}

				
function deleteTool(req, res) {
try{
  const query = ('DELETE FROM tools where domain=?');
  const param = [req.params.id];
  console.log(param);
  res.status(202).send(param + ' deleted');
  client.execute(query,[req.params.id], (err, result) => {
    if (err) throw console.log(err);
    console.log(result);
  });}
  catch(err){
        res.send({error: "Unexpected internal error occurred, please try later...!"});
}
}
module.exports = {
  deleteTool,
  modifyTool,
  getTools,
  postTools,
  deleteEvent,
  deleteAction,
};
