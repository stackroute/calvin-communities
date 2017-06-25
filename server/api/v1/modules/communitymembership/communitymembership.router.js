const express = require('express');

const communityMembershipCtrl = require('./communitymembership.controller');

const router = express.Router();

/*
 * Effective URI of the API is POST /:domain/members
 *
 * API for Adding members to the community
 *
 *
 */

router.post('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    // console.log(values);
    const domainName = req.params.domain;
    // console.log(domainName);
    communityMembershipCtrl.addMembersToCommunity(domainName, values, (err) => {
      if (err) {
        console.log('Error in communityMembershipCtrl.addMemberToCommunity error :', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send({ message: 'Member added' });
    });
  } catch (err) {
    console.log('Unexpected error in inserting values ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...! ' });
  }
});

/*
 * Effective URI of the API is Delete /:domain/members
 *
 * API Deleting a Member from the Community
 * URL Parameter
 *  - username:  specify a specific user name and domain : specify a community to delete a member
 *
 */

router.delete('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    const domainName = req.params.domain;
    communityMembershipCtrl.removeMembersFromCommunity(domainName, values, (err) => {
      if (err) {
        console.log('Error in communityMembershipCtrl.removeMembersFromCommunity error :', err);
        return res.status(404).send({ error: 'Error in operation, please try later..!' });
      }
      return res.status(204).send({ message: 'Member deleted' });
    });
  } catch (err) {
    console.log('Unexpected error in inserting values ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...! ' });
  }
});

/*
 * Effective URI of the API is PATCH /:domain/members
 *
 * API for Updating role to a Members of a Community
 * URL Parameter
 *  - username:specify a specific user name and domain :specify a community to update role
 *
 */

router.patch('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    const domainName = req.params.domain;
    communityMembershipCtrl.modifyRoleOfMembersFromCommunity(domainName, values, (err, message) => {
      if (err) {
                // console.log('Error in communityMembershipCtrl.addMemberToCommunity error :', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' }, null);
      }
      return res.send(undefined, message);
    });
  } catch (err) {
        // console.log('Unexpected error in inserting values ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...! ' });
  }
});


/*
 * Effective URI of the API is GET /:domain/memberscheck
 *
 * API for checking avilability
 *
 * URL Parameter
 *  -  domain: specify a specific community Name to get detail of a particular member
 *
 */

router.get('/:domain/memberscheck', (req, res) => {
  try {
    const domainName = req.params.domain;
    communityMembershipCtrl.checkCommunityToUpdateMembersDetail(domainName, (err, results) => {
      if (err) {
                // console.log('communityMembershipCtrl.checkCommunityToUpdateMembersDetail: ', err);
        return res.status(404).send(err);
      }

      return res.send(results);
    });
  } catch (err) {
        // console.log('Unexpected error in fetching community roles ', err);
    return res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
  return null;
});

/*
 * Effective URI of the API is GET /member/:domain/communities/role
 *
 * API for returning all Details of a members in a specified Community
 *
 * URL Parameter
 *  -  domain: specify a specific Community Name, to get their details
 *
 */

router.get('/:domain/members', (req, res) => {
  try {
    const domainName = req.params.domain;
    console.log('Inside router /:domain/members', domainName);
    communityMembershipCtrl.getParticularCommunityMembersDetails(domainName, (err, results) => {
      if (err) {
                // console.log('Error in communityMembershipCtrl.getParticularCommunityMemberDetails error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      return res.send(results);
    });
  } catch (err) {
        // console.log('Unexpected error in fetching members of a community...', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});

module.exports = router;
