const communityRoleService = require('./communityrole.service');

function getCommunityRoles(domainName, done) {
  communityRoleService.getCommunityRoles(domainName, done);
}
function postCommunityRoles(postedData, done) {
  let params = [postedData.domain, postedData.role, postedData.actions, postedData.toolid];

  communityRoleService.postCommunityRoles(params, done);
}

/*function getcommunityrole(req, res) {
  try {
    service.getcommunityrole((err, result) => {
      if (err) {
        res.status(404).send(err);
        return;
      }
      res.send(result.rows);
    });
  } catch (err) {
    res.send({ error: 'Unexpected error from GET' });
  }
}

function postcommunityrole(req, res) {
  try {
    if (req.body.domain) {
      if (req.body.role) {
        if (req.body.domain !== null && req.body.role !== null) {
          service.postcommunityrole(req.body, (err) => {
            if (err) {
              res.status(404).send(err);
              return;
            }

            res.status(201).send('post added');
          });
        } else {
          res.send('Please don`t send null values');
        }
      } else {
        res.send('role value was passed as null');
      }
    } else {
      res.send('domain was passed as null');
    }
  } catch (err) {
    res.send({ error: 'Unexpected error from POST' });
  }
}

function patchcommunityrole(req, res) {
  try {
    service.patchcommunityrole(req.body, req.params, (err) => {
      if (err) {
        res.status(404).send(err);
        return;
      }

      res.status(201).send('patch done');
    });
  } catch (err) {
    res.send({ error: 'Unexpected error from Patch' });
  }
}*/

module.exports = {
  getCommunityRoles,
  postCommunityRoles
  /*getcommunityrole,
  postcommunityrole,
  patchcommunityrole,*/
};
