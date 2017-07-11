const router = require('express').Router();

const membershipCtrl = require('./membership.controller');

const membershipServ = require('./membership.service');

const logger = require('../../../../logger');


/*
 * Effective URI of the API is GET /membership/:username
 *
 * API for returning all community details for a specified member.
 *
 * URL Parameter
 *  - username: specify a specific user name, to get their details
 *
 */

router.get('/:username', (req, res) => {
  try {
    membershipCtrl.getCommunityList(req.params.username.toLowerCase(), (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error...' });
  }
  return null;
});

router.post('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    const domainName = req.params.domain;
    membershipServ.userCommunityDetails(domainName, values, (err) => {
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

router.patch('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    const domainName = req.params.domain;
    membershipServ.modifyRoleOfMemberInCommunity(domainName, values, (err) => {
      if (err) {
        logger.debug(err);
        return res.status(400).send(err);
      }
      logger.debug('Role modified');
      return res.status(200).send({ message: 'Role modified' });
    });
  } catch (err) {
        logger.debug('Unexpected error in inserting values ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...! ' });
  }
});


router.delete('/:domain/members', (req, res) => {
  try {
    const values = req.body;
    const domainName = req.params.domain;
    membershipServ.removeMemberFromCommunity(domainName, values, (err) => {
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


module.exports = router;
