const router = require('express').Router();

const logger = require('../../../../logger');

const membershipCtrl = require('./membership.controller');

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
    logger.debug("req.body", req.params.username);
    membershipCtrl.getCommunityList(req.params.username.toLowerCase(), (err, results) => {
      if (err) {
        return res.status(400).send({ error: 'username does not exist ' });
      }
      return res.status(200).send(results);
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error...' });
  }
});

module.exports = router;
