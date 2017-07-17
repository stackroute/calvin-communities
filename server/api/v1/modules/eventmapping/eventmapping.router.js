const router = require('express').Router();

const eventmappingCtrl = require('./eventmapping.controller');


router.get('/:tooldata/events/:eventid', (req, res) => {
	console.log("inside router", req.params);
	eventmappingCtrl.getmappingDetails(req.params, (err, results) => {
		if(err) {
			return res.send(err);
		} else {
		return res.send (results);
	}
	});
});

module.exports = router;