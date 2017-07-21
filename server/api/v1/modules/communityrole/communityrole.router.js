const express = require('express');

const communityRoleCtrl = require('./communityrole.controller');

const logger = require('../../../../logger');

const router = express.Router();

// router.get('/', controller.getcommunityrole);

/*
 * Effective URI of the API is GET /communityrole/:domainname
 *
 * API for returning all roles of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its roles
 *
 */
/* router.get('/:domainname', (req, res) => {
  try {
    const domainName = req.params.domainname;
    communityRoleCtrl.getCommunityRoles(domainName, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
    res.status(400).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});
*/
/*
 * Effective URI of the API is GET /communityrole/:domainname?onlyroles=true
 *
 * API for returning all roles of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its roles
 *
 */
router.get('/:domainname', (req, res) => {
  try {
    const domainName = req.params.domainname;
    const onlyroles = req.query.onlyroles;
    logger.debug('onlyroles: ', onlyroles);
    if (onlyroles === 'true') {
      communityRoleCtrl.getCommunityRolesOnly(domainName, onlyroles, (err, results) => {
        if (err) {
          return res.status(400).send(err);
        }

        return res.send(results);
      });
    } else if (onlyroles === undefined) {
      communityRoleCtrl.getCommunityRoles(domainName, (err, results) => {
        if (err) {
          return res.status(400).send(err);
        }

        return res.send(results);
      });
    } else {
      return res.send({ error: 'Unexpected error occurred, please try again...!' }, undefined);
    }
  } catch (err) {
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});


/* router.post('/', controller.postcommunityrole);

router.patch('/:domain/:role', controller.patchcommunityrole);
*/
/*
 * Effective URI of the API is POST /
 *
 * API for posting domain, role, toolid, actions
 *
 * URL Parameter
 *  - Domain Name: just a simple uri is enough to post its roles
 *
 */
/* router.post('/', (req, res) => {
  try {
    communityRoleCtrl.postCommunityRoles(req.body, (err) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.send('Added');
    });
  } catch (err) {
    logger.debug(`error:${err}`);
    res.status(400).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});*/
router.post('/:domainname', (req, res) => {
  try {
    const domainName = req.params.domainname;
    communityRoleCtrl.postCommunityRoles(domainName, req.body, (err) => {
      if (err) {
        return res.status(400).send(err);
      }
      // return res.send(req.body);
      return res.send('Added');
    });
  } catch (err) {
    logger.debug(`error:${err}`);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is Patch /communityrole/:domainname/:role
 *
 * API for returning all roles of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its roles
 *
 */
/* router.patch('/:domainname/:role', (req, res) => {
  try {
    const domainName = req.params.domainname;
    const role = req.params.role;
    const values = req.body;

    communityRoleCtrl.patchCommunityRoles(values, domainName, role, (err) => {
      if (err) {
        return res.status(400).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send('Updated');
    });
  } catch (err) {
    res.status(400).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});*/
router.patch('/:domainname/roles/:role', (req, res) => {
  try {
    const domainName = req.params.domainname;
    const role = req.params.role;
    const values = req.body;

    communityRoleCtrl.patchCommunityRoles(values, domainName, role, (err) => {
      if (err) {
        return res.status(400).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send('Updated');
    });
  } catch (err) {
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is GET /communityrole/:domainname
 *
 * API for returning all roles of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its roles
 *
 */
// router.get('/:domainName/:role/:toolid', (req, res) => {
//   try {
//     const domainName = req.params.domainname;
//     const role = req.params.role;
//     const toolid = req.params.toolid;
//     communityRoleCtrl.getCommunityRoles(domainName, role, toolid, (err, results) => {
//       if (err) {
//         return res.status(400).send(err);
//       }

//       return res.send(results);
//     });
//   } catch (err) {
//     res.status(400).send({ error: 'Unexpected error occurred, please try again...!' });
//   }
// });
module.exports = router;
