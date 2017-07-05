const router = require('express').Router();

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
    const username = req.params.username;
    membershipCtrl.getCommunityList(username, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(results);
    });
  } catch (err) {
    return res.status(500).send({ error: 'Unexpected internal error...' });
  }
  return null;
});

module.exports = router;
