const model = require('cassandra-driver');
const service = require('./invite.service');


function createInvitation(req, res) {
  if (req.body.email) {
    if (req.body.domain) {
      if (req.body.email !== null && req.body.domain !== null) {
        const params = {

          email: req.body.email,

          domain: req.body.domain,
          status: req.body.status,
          type: req.body.type,
          approver: req.body.approver,
          id: model.types.Uuid.random().toString().split('-').join(''),
        };

        service.insert(params, (err) => {
          res.status(201);

          if (err) {
            res.status(404).send(err);
          }
        });
        res.send();
      }
    } else {
      res.status(404).send('please enter domain field!!');
    }
  } else {
    res.status(404).send('please enter email fields!!');
  }
}


function updateInvite(req, res) {
  if ((req.params.id).length > 4) {
    if ((req.body.status) && req.body.status !== null) {
      if ((req.body.status === 'approved')) {
        if ((req.body.approver) && req.body.approver !== null) {
          const params = {
            status: req.body.status,
            id: req.params.id,
            approver: req.body.approver,
          };
          service.update(params, (err) => {
            if (err) {
              res.status(404);
            }
            // res.send(results);
          });
        } else {
          res.status(404).send('approver should not be empty!!');
        }
      } else {
        const params = {
          status: req.body.status,
          id: req.params.id,
        };
        service.statusupdate(params, (err) => {
          if (err) {
            res.status(404);
          }
          // res.send(results);
        });
      }
    } else {
      res.status(404).send('status should not be empty!!');
    }
  } else {
    res.status(404).send('id should not be empty!!');
  }
}

function deleteRequest(req, res) {
  if ((req.params.id).length > 4) {
    const params = {
      id: req.params.id,
    };
    service.rejected(params, (err) => {
      res.status(201);

      if (err) {
        res.status(404).send(err);
        return;
      }
      res.send();
    });
  } else {
    res.status(404).send('id should not be empty!!');
  }
}


module.exports = {
  updateInvite,
  createInvitation,
  deleteRequest,
};
