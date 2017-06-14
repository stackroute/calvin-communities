const express = require('express');

const controller = require('./invite.controller');

const router = express.Router();
// router.get('/', controller.retrieveAllCartoons);
// router.get('/:id', controller.retrieveCartoon);
router.post('/send', controller.createInvitation);
router.put('/action/:id', controller.updateInvite);
router.delete('/delete/:id', controller.deleterequest);

module.exports = router;
