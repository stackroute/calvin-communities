const router = require('express').Router();

router.use('/community', require('../../modules/community'));

router.use('/memberrequests', require('../../modules/memberrequests'));

router.use('/tools', require('../../modules/tools/'));

router.use('/counter', require('../../modules/communitiescounter/'));

router.use('/membership', 	require('../../modules/member/'));

router.use('/communityrole', require('../../modules/communityrole/'));

router.use('/communitytemplates', require('../../modules/communitytemplates/'));

module.exports = router;
