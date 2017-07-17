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

function getToolEventMapping(parameters, done) {
	eventmappingServices.getToolEventMapping(parameters, done);
}

function getEventMapping(parameters, done) {
	eventmappingServices.getEventMapping(parameters, done);
}

function postEventMapping(parameters, details, done) {
  console.log(details)

 /* if (!_.has(details, 'name') || !_.has(details, 'description') ||
    !_.has(details, 'communityevent') || !_.has(details, 'metadata')) {
  	return done([400, 'Required Details not found']);
  }*/
  details.forEach((data) => {
  	console.log(data);
  })

  if(parameters && details) {
  	const mappingdata = {
  		domain: parameters.domain,
  		toolid: parameters.toolid,
  		eventid : parameters.eventid,
  		eventname: details.name,
  		eventdescription: details.description,
  		communityactivityevent: details.communityevent,
  		metadata: details.metadata

  	}
  	eventmappingServices.postEventMapping(mappingdata, done);
  } else {
  	done([400, 'Required Details not found'])
  }

}

function updateEventMapping(parameters, details, done) {

}


/*function getmappingDetails(dataFromBody, done) {
	eventmappingServices.getmappingDetails(dataFromBody.tooldata, dataFromBody.eventid, done);

}*/



module.exports = {
  getEventMapping,
  getToolEventMapping,
  postEventMapping,
  updateEventMapping
}