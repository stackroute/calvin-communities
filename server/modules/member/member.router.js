const express = require('express');

const membershipCtrl = require('./member.controller');

const router = express.Router();

/* router.post('/community/member', (req, res) => {
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
});*/

router.get('/communities/member/:username', (req, res) => {
  try {
    membershipCtrl.getParticularMemberDetailInCommunities(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

/* router.get('/member/community/:domain', (req, res) => {
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
