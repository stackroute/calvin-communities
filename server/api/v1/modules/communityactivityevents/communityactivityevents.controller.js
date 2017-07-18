const activityeventtypes = require('./activityeventstypes');

/*
 * Get all the community activity events
 */
function getCommunityActivityEvents(done) {
  return done(activityeventtypes.activityeventtypes);
}

module.exports = {
  getCommunityActivityEvents,
};
