const express = require('express');

const membershipCtrl = require('./member.controller');

const router = express.Router();


/*
 * Effective URI of the API is GET /communities/member/:username
 *
 * API for returning all Details of a specified user
 *
 * URL Parameter
 *  - User Name: specify a specific user name, to get its details
 *
 */

router.get('/communities/member/:username', (req, res) => {
  try {
    const userName = req.params.username;
    membershipCtrl.getParticularMemberDetailInCommunities(userName, (err, results) => {
      if (err) {
        console.log('Error in communityRoleCtrl.getCommunityRoles error: ', err);
        return res.status(500).send({ error: 'Error in operation, please try later..!' });
      }
      res.send(results);
    });
  } catch (err) {
    console.log('Unexpected error in fetching community roles ', err);
    res.status(500).send({ error: 'Unexpected error occurred, please try again...!' });
  }
});

/*router.post('/community/member', (req, res) => {
  try {
    res.send(controller.addMemberToCommunity(req, res));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/communities/members', (req, res) => {
  try {
    controller.getAllMembersInCommunities(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/communities/member/:username', (req, res) => {
  try {
    controller.getParticularMemberDetailInCommunities(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/member/community/:domain', (req, res) => {
  try {
    controller.getParticularCommunityMemberDetails(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/communities', (req, res) => {
  try {
    controller.getAllCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.delete('/community/:domain', (req, res) => {
  try {
    controller.deleteParticularCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.delete('/community/:domain/member/:username', (req, res) => {
  try {
    controller.deleteParticularMemberFromCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.patch('/community/:domain/member/:username/role', (req, res) => {
  try {
    controller.modifyRoleOfMemberFromCommunity(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});*/

module.exports = router;
