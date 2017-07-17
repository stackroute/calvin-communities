const async = require('async');
const _ = require('lodash');
const communitytoolsCtrl = require('../communitytools/communitytools.controller');
const eventmappingServices = require('./eventmapping.service');



/*function getActivityEvents(domainName, data)
{
	console.log("communityactivitylist");
	communitytoolsCtrl.getActions(domainName, data, (err, result) => {
		if(err) {
			console.log(err);
		} else {
			console.log("Activityevents", result);
		}
	})
}

async.waterfall([getActivityEvents.bind(null, domainName, data)], function(err, result) {
	if(err) {
	console.log(err);
} else {
	console.log(result);
}
});*/

function getEventMapping() {

}

function postEventMapping(parameters, details, done) {

  if (!_.has(details, 'name') || !_.has(details, 'description') ||
    !_.has(details, 'communityevent') || !_.has(details, 'metadata')) {
  	return done([400, 'Required Details are not found']);
  }

  if(parameters && details) {
  	console.log('hiii');
  	done();
  }

}

function updateEventMapping() {

}


/*function getmappingDetails(dataFromBody, done) {
	eventmappingServices.getmappingDetails(dataFromBody.tooldata, dataFromBody.eventid, done);

}*/



module.exports = {
  getEventMapping,
  postEventMapping,
  updateEventMapping
}
