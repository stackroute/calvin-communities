const express = require('express');

const membershipCtrl = require('./membership.controller');

const router = express.Router();


/*
 * Effective URI of the API is POST /community/member/role
 *
 * API for Adding
 *
 *
 *
 */
/*
router.post('/member/community/role', (req, res) => {
  try {
    const values = req.body;
    membershipCtrl.addedMemberToCommunity(values, (err) => {
      if (err) {
        // console.log('Error in membershipCtrl.addedMemberToCommunity error :', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      // console.log('Member added');
      return res.send({ message: 'Member added' });
    });
  } catch (err) {
    // console.log('Unexpected error in inserting values ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});
*/
/*
 * Effective URI of the API is GET /member/:username/communities/role
 *
 * API for returning all Details of a specified user in All communities
 *
 * URL Parameter
 *  - User Name: specify a specific user name, to get their details
 *
 */


router.get('/:username/communities', (req, res) => {
  try {
    const userName = req.params.username;
    membershipCtrl.getParticularMemberDetailInCommunities(userName, (err, results) => {
      if (err) {
        // console.log('Error in membersCtrl.getParticularMemberDetailInCommunities error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send(results);
    });
  } catch (err) {
    // console.log('Unexpected error in communities of a member ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});


 /*
 * Effective URI of the API is PATCH /member/:username/community/:domain/role
 *
 * API for Updating role to a Member for a Community
 * URL Parameter
 *  - username:specify a specific user name and domain :specify a community to update role
 *
 */
/*
router.patch('/community/:domain/role/member/:username', (req, res) => {
  try {
    const params = {
      userName: req.params.username,
      domainName: req.params.domain,
    };
    const memberRole = req.body.role;
    membershipCtrl.modifyRoleOfMemberFromCommunity(params, memberRole, (err) => {
      if (err) {
      //  console.log('Error in membersCtrl.modifyRoleOfMemberFromCommunity error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send({ message: 'Updated' });
    });
  } catch (err) {
    // console.log('Unexpected error in Updating Role to a member in a community ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});
*/
/*
 * Effective URI of the API is Delete /remove/member/:username/community/:domain/role
 *
 * API Deleting a Member from the Community
 * URL Parameter
 *  - username:  specify a specific user name and domain : specify a community to delete a member
 *
 */
/*
router.delete('/removemember/:username/community/:domain', (req, res) => {
  try {
    const params = {
      userName: req.params.username,
      domainName: req.params.domain,
    };
    membershipCtrl.removeMemberFromCommunity(params, (err) => {
      if (err) {
      //  console.log('Error in membersCtrl.removeMemberFromCommunity error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send({ message: 'Deleted' });
    });
  } catch (err) {
    // console.log('Unexpected error in removing member from a community ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});
*/
module.exports = router;
