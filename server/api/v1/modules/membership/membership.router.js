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
// router.get('/:username/List', (req, res) => {
//   try {
//     membershipCtrl.getAvatarForCommunities(req.params.username.toLowerCase(), (err, results) => {
//       if (err) {
//         return res.status(400).send(err);
//       }
//       return res.send(results);
//     });
//   } catch (err) {
//     return res.status(500).send({ error: 'Unexpected internal error...' });
//   }
//   return null;
// });


module.exports = router;
