const activityeventtypes = require('./activityeventstypes');

/*
 * Get all the community activity events
 */
function getCommunityActivityEvents(done) {
  return done(activityeventtypes);
}

module.exports = {
  getCommunityActivityEvents,
};
