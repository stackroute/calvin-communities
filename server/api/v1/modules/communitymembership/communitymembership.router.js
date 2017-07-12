const express = require('express');

const communityMembershipCtrl = require('./communitymembership.controller');

const logger = require('../../../../logger');

const router = express.Router();

/*
 * Effective URI of the API is POST /:domain/members
 *
 * API for Adding members to the community
 */

router.post('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    const domainName = req.params.domain;
    communityMembershipCtrl.addMembersToCommunity(domainName, values, (err) => {
      if (err) {
        logger.debug(err);
        return res.status(400).send(err);
      }
      logger.debug('adding member');
      return res.status(200).send({ message: 'Member added' });
    });
  } catch (err) {
    logger.debug('Unexpected error in inserting values ', err);
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
        logger.debug(err);
        return res.status(400).send(err);
      }
      logger.debug('removing member');
      return res.status(200).send({ message: 'Member deleted' });
    });
  } catch (err) {
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
    communityMembershipCtrl.modifyRoleOfMembersFromCommunity(domainName, values, (err) => {
      if (err) {
        logger.debug(err);
        return res.status(400).send(err);
      }
      logger.debug('Role modified');
      return res.status(200).send({ message: 'Role modified' });
    });
  } catch (err) {
    res.status(500).send({ error: 'Unexpected error occurred, please try again...! ' });
  }
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
    communityMembershipCtrl.getParticularCommunityMembersDetails(domainName, (err, results) => {
      if (err) {
        logger.debug(err);
        return res.status(400).send(err);
      }
      logger.debug(results);
      return res.status(200).send(results);
    });
  } catch (err) {
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});

module.exports = router;
