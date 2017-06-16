const model = require('cassandra-driver');
const service = require('./memberrequests.service');

const statusstring = [
  'approved', 'invitesent', 'accepted', 'requested',
];

/* // Inviting the values into the table for both request and invite

function createInvitation(req, res) {
  let flag = false;
  if ((req.body.email) && (req.body.domain)) {
    if (req.body.email !== null && req.body.domain !== null) {
      statusstring.forEach((a) => {
        if (req.body.status.includes(a)) {
          flag = true;
        }
      });
    }
  }

  if (flag) {
    const params = {
      email: req.body.email,
      domain: req.body.domain,
      status: req.body.status,
      type: req.body.type,
      approver: req.body.approver,
      id: model.types.Uuid.random().toString().split('-').join(''),
    };

    service.insert(params, (err) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(201).send('Created');
    });
  } else {
    res.status(404).send('enter proper value !!');
  }
}

// Upadate the status for both request and invite

function updateInvitation(req, res) {
  let flag = false;
  const value = { id: req.params.id };

  service.getMemberById(value, (error, result) => {
    if (error) res.status(304).send(error);
    const inviteType = result.rows[0].type;

    if ((req.params.id) && (req.params.id !== null) && (req.body.status) &&
     (req.body.status !== null)) {
      statusstring.forEach((a) => {
        if (req.body.status.includes(a)) {
          flag = true;
        }
      });
    }

    if (flag) {
      if ((req.body.status === 'approved') && inviteType === 'request') {
        if ((req.body.approver) && req.body.approver !== null) {
          const params = {
            status: req.body.status,
            id: req.params.id,
            approver: req.body.approver,
          };
          service.update(params, (err) => {
            if (err) res.status(304).send(err);
            res.status(202).send('Updated');
          });
        } else res.status(404).send('approver sholud not be empty');
      } else if ((req.body.status === 'accepted') && (req.body.status === 'resent') && inviteType === 'invite') {
        const params = {
          status: req.body.status,
          id: req.params.id,
        };
        service.statusupdate(params, (err) => {
          if (err) res.status(304).send(err);
          res.status(202).send('Updated');
        });
      } else { res.status(404).send('check type of that id and status value!!'); }
    } else res.status(404).send('id and status should be in correct format!!');
  });
}

// Deleting the id in the table when the request or invite is rejected

function rejectedInviteRequest(req, res) {
  if ((req.params.id) && (req.params.id !== null)) {
    const params = {
      id: req.params.id,
    };
    service.rejected(params, (err) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send('deleted');
    });
  } else {
    res.status(404).send('id should not be empty!!');
  }
}

// Getting all the invite and request lists in the table

function gettingMembers(req, res) {
  service.getMember((err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(result.rows);
  });
} */

// Getting the table details for particular id

function gettingValuesById(id , done) {
  service.gettingValuesById(id , done);
}



function InsertData(values,done){
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

    service.InsertData(params , done); 
  } else {
    res.status(404).send('enter proper value !!');
  }
}
  
module.exports = {
  // updateInvitation,
  // createInvitation,
  // rejectedInviteRequest,
  // gettingMembers,
  // gettingMembersById,
gettingValuesById,
InsertData

};

