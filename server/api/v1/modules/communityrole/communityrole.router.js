const express = require('express');
const communityRoleCtrl = require('./communityrole.controller');

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
router.get('/:domainname', (req, res) => {
  try {
    const domainName = req.params.domainname;
    communityRoleCtrl.getCommunityRoles(domainName, (err, results) => {
      if (err) {
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send(results);
    });
  } catch (err) {
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
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
router.post('/', (req, res) => {
  try {
    communityRoleCtrl.postCommunityRoles(req.body, (err) => {
      if (err) {
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send('Added');
    });
  } catch (err) {
    console.log(`error:${err}`);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
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
router.patch('/:domainname/:role', (req, res) => {
  try {
    const domainName = req.params.domainname;
    const role = req.params.role;
    const values = req.body;

    communityRoleCtrl.patchCommunityRoles(values, domainName, role, (err) => {
      if (err) {
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }

      return res.send('Updated');
    });
  } catch (err) {
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});


module.exports = router;
