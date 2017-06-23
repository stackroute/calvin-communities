const router = require('express').Router();

router.use('/communities', require('./modules/community'));

router.use('/memberrequests', require('./modules/memberrequests'));

router.use('/communitytools', require('./modules/communitytools'));

router.use('/membership', require('./modules/communitymembership'));

router.use('/members', require('./modules/members'));

router.use('/communityrole', require('./modules/communityrole'));

router.use('/communitytemplates', require('./modules/communitytemplates'));

router.use('/tools', require('./modules/tools'));

module.exports = router;
