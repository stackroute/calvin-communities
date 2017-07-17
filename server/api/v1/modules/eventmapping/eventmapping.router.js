const router = require('express').Router();

const eventmappingCtrl = require('./eventmapping.controller');


router.get('/events', (req, res) => {
	eventmappingCtrl.getmappingDetails(tooldata, (err, results) => {
		if(err) {
			return res.send(err);
		} else {
		return res.send (results);
	}
	});
});

module.exports = router;