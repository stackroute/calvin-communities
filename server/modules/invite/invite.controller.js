const model = require('cassandra-driver');
const service = require('./invite.service');

const statusstring = [
  'approved', 'invitesent', 'accepted', 'requested',
];


function createInvitation(req, res) {
  let flag = false;
  if (req.body.email) {
    if (req.body.domain) {
      if (req.body.email !== null && req.body.domain !== null) {
        statusstring.forEach((a) => {
          console.log(a);
          if (req.body.status.includes(a)) {
            console.log(a);
            flag = true;
          }
        });
        console.log(flag);
        if (flag) {
          console.log(flag);
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
          res.status(404).send('enter proper status value!!');
        }
      }
    } else {
      res.status(404).send('please enter domain field!!');
    }
  } else {
    res.status(204).send('please enter email fields!!');
  }
}


function updateInvitation(req, res) {
  let flag = false;
  const value = { id: req.params.id };
  console.log(value);
  service.getMemberById(value, (err1, result) => {
    if (err1) {
      res.status(304).send(err1);
    }
    const ress = result.rows[0].type;
    console.log(`gasuay${ress}`);

    if ((req.params.id).length > 4) {
      if ((req.body.status) && req.body.status !== null) {
        statusstring.forEach((a) => {
          if (req.body.status.includes(a)) {
            flag = true;
          }
        });

        if (flag) {
          if ((req.body.status === 'approved') && ress === 'request') {
            if ((req.body.approver) && req.body.approver !== null) {
              const params = {
                status: req.body.status,
                id: req.params.id,
                approver: req.body.approver,
              };
              service.update(params, (err) => {
                if (err) {
                  res.status(304).send(err);
                }
              });
              res.status(202).send('Updated');
            } else {
              res.status(404).send('approver should not be empty!!');
            }
          } else if (ress === 'invite') {
            const params = {
              status: req.body.status,
              id: req.params.id,
            };
            service.statusupdate(params, (err) => {
              if (err) {
                res.status(304).send(err);
              }
            });
            res.status(202).send('Updated');
          } else {
            res.status(404).send('its already approved!!');
          }
        } else {
          res.status(404).send('status should be in proper!!');
        }
      } else {
        res.status(404).send('status should not be empty!!');
      }
    } else {
      res.status(404).send('id should not be empty!!');
    }
  });
}

function rejectedInviteRequest(req, res) {
  if ((req.params.id).length > 4) {
    const params = {
      id: req.params.id,
    };
    service.rejected(params, (err) => {
      if (err) {
        res.status(404).send(err);
      }
    });

    res.status(200).send('deleted');
  } else {
    res.status(404).send('id should not be empty!!');
  }
}


function gettingMembers(req, res) {
  service.getMember((err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(result.rows);
  });
}

function gettingMembersById(req, res) {
  service.getMemberById(req.params, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(result.rows);
  });
}

module.exports = {
  updateInvitation,
  createInvitation,
  rejectedInviteRequest,
  gettingMembers,
  gettingMembersById,
};
