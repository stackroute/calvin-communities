const express = require('express');

require('body-parser');

const controller = require('./community.controller');

const router = express.Router();

router.get('/', controller.allcommunities);

router.post('/', controller.addcommunity);

router.get('/:id', controller.getcommunity);


module.exports = router;
