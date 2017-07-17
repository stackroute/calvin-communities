const communitytoolsCtrl = require('./communitytools/communitytools.controller');

const eventmappingServices = require('./eventmapping.service');

function getActivityEvents(domainName, data)
{
	communitytoolsCtrl.getActions(domainName, data, (err, result) => {
		if(err) {
			console.log(err);
		} else {
			console.log("Activityevents", result);
		}
	})
}

async.waterfall([getActivityEvents.bind(domainName, data)], function(err, result) {
	if(err) {
	console.log(err);
} else {
	console.log(result);
}
});

function getmappingDetails(toolData, done) {
	eventmappingServices.getmappingDetails(toolData,done);

}

module.exports = {
	getmappingDetails,
}