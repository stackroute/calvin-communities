const express = require('express');

const controller = require('./communityrole.controller');

const router = express.Router();

router.get('/',controller.getcommunityrole);

router.post('/',controller.postcommunityrole);

router.patch('/:domain/:role',controller.patchcommunityrole);
	

module.exports = router;