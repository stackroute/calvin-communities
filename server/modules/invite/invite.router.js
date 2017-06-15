const express = require('express');

const controller = require('./invite.controller');

const router = express.Router();
// router.get('/', controller.retrieveAllCartoons);
// router.get('/:id', controller.retrieveCartoon);
// router.post('/send', controller.createInvitation);
// router.put('/action/:id', controller.updateInvite);
// router.delete('/delete/:id', controller.deleterequest);
router.post('/send', (req, res) => {
  try {
    controller.createInvitation(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.patch('/action/:id', (req, res) => {
  try {
    controller.updateInvitation(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.delete('/rejected/:id', (req, res) => {
  try {
    controller.rejectedInviteRequest(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/lists', (req, res) => {
  try {
    controller.gettingMembers(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.get('/:id', (req, res) => {
  try {
    controller.gettingMembersById(req, res);
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
