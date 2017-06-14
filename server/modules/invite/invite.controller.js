const model = require('cassandra-driver');

const connectionString = require('../../connect');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});


function createInvitation(req, res) {
  const params = {
    email: req.body.email,
    domainname: req.body.domainname,
    status: req.body.status,
    type: req.body.type,
    approver: req.body.approver,
    id: model.types.Uuid.random().toString().split('-').join(''),
  };
  const query = ('insert into invite_request(id,email , domainname  , type , status, approver) values(:id,:email,:domainname,:type,:status,:approver)');
  client.execute(query, params, (err) => {
    if (err) throw res.send(err);
    return res.status(201).send();
  });
}


function updateInvite(req, res) {
  if (req.body.status === 'approved') {
    const params = {
      status: req.body.status,
      id: req.params.id,
      approver: req.body.approver,
    };
    const query = ('update invite_request set status = :status, approver = :approver where id = :id');
    client.execute(query, params, (err) => {
      if (err) throw res.send(err);
      return res.status(200).send();
    });
  }
  else {
    const params = {
      status: req.body.status,
      id: req.params.id,
    };
    const query = ('update invite_request set status = :status where id = :id');

    client.execute(query, params, (err) => {
      if (err) throw res.send(err);
      return res.status(200).send();
    });
  }
}

function deleterequest(req, res) {
  const params = {
    id: req.params.id,
  };
  const query = ('delete from invite_request where id = :id');

  client.execute(query, params, (err) => {
    if (err) throw res.send(err);
    res.status(200).send();
  });
}


module.exports = {
  updateInvite,
  createInvitation,
  deleterequest,
};
