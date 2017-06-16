const express = require('express');
const communityRoleCtrl = require('./communityrole.controller');

const router = express.Router();

// router.get('/', controller.getcommunityrole);

/*
 * Effective URI of the API is GET /communityrole/:domainname
 *
 * API for returning all roles of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get its roles
 *
 */
router.get('/:domainname', function(req, res){
	try{
		let domainName = req.params.domainname;
		communityRoleCtrl.getCommunityRoles(domainName, (err, results) => {
			if(err) {
				console.log("Error in communityRoleCtrl.getCommunityRoles error: ", err);
				return res.status(500).send({error: "Error in operation, please try later..!"});
			}

			res.send(results);
		});

	} catch (err) {
		console.log("Unexpected error in fetching community roles ", err);
		res.status(500).send({error: "Unexpected error occurred, please try again...!"});
	}
});

/*router.post('/', controller.postcommunityrole);

router.patch('/:domain/:role', controller.patchcommunityrole);
*/

module.exports = router;
