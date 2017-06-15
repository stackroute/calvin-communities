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
    res.send(controller.createInvitation(req, res));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.patch('/action/:id', (req, res) => {
  try {
    res.send(controller.updateInvite(req, res));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

router.delete('/delete/:id', (req, res) => {
  try {
    res.send(controller.deleteRequest(req, res));
  } catch (err) {
    res.send({ error: 'Unexpected internal error occurred, please try later...!' });
  }
});

module.exports = router;
