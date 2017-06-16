const router = require('express').Router();
const controller = require('./community.controller');

router.get('/', controller.allcommunities);

router.post('/', controller.addcommunity);

router.get('/:id', controller.getcommunity);

router.patch('/:id', controller.updatecommunity);

module.exports = router;
