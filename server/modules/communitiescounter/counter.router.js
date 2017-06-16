const express = require('express');

require('body-parser');

const controller = require('./counter.controller');

const router = express.Router();

router.get('/counter', controller.getcounter);
router.patch('/increment/member/:id', controller.incrementmember);
router.patch('/increment/invitation/:id', controller.incrementinvitation);
router.patch('/increment/tool/:id', controller.incrementtools);
router.patch('/increment/requests/:id', controller.incrementrequests);
router.patch('/decrement/tool/:id', controller.decrementtools);
router.patch('/decrement/member/:id', controller.decrementmember);
router.patch('/decrement/invitation/:id', controller.decrementinvitation);
router.patch('/decrement/requests/:id', controller.decrementrequests);


module.exports = router;
