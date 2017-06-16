const router = require('express').Router();

router.use('/community', require('../../modules/community'));

router.use('/invitation', require('../../modules/memberrequests'));

router.use('/tools', 			require('../../modules/tools/'));

router.use('/counter', 		require('../../modules/communitiescounter/'));

router.use('/', 					require('../../modules/member/'));

router.use('/communityrole', require('../../modules/communityrole/'));

//router.use('/community', require('../../modules/communitytemplates/'));

module.exports = router;