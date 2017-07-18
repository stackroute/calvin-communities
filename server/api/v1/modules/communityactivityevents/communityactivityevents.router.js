const router = require('express').Router();

const activityeventsCtrl = require('./communityactivityevents.controller');

router.get('/', (req, res) => {
  activityeventsCtrl.getCommunityActivityEvents((err, results) => {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
});

module.exports = router;
