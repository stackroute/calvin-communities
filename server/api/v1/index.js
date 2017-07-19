const router = require('express').Router();

router.use('/communities', require('./modules/community'));

router.use('/memberrequests', require('./modules/memberrequests'));

router.use('/communitytools', require('./modules/communitytools'));

router.use('/communitymembership', require('./modules/communitymembership'));

router.use('/membership', require('./modules/membership'));

router.use('/communityrole', require('./modules/communityrole'));

router.use('/communitytemplates', require('./modules/communitytemplates'));

router.use('/tools', require('./modules/tools'));

router.use('/activityevents', require('./modules/communityactivityevents'));

router.use('/webhooks', require('./modules/webhook'));

module.exports = router;
