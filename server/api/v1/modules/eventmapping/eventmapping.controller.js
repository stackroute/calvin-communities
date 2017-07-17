const async = require('async');

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

function getmappingDetails(dataFromBody, done) {
	console.log(dataFromBody);
	console.log("aaa",dataFromBody.tooldata)
	eventmappingServices.getmappingDetails(dataFromBody.tooldata, dataFromBody.eventid, done);

}

module.exports = {
	getmappingDetails,
	getActivityEvents,
}