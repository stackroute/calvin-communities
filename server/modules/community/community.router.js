const router = require('express').Router();
const communityCtrl = require('./community.controller');



/**
* Get For all communities, 
* URI is: /api/v1/community
* GET REQUEST
*
*
*/

router.get('/', (req,res) =>{
	try{
		communityCtrl.allcommunities((err, results) => {
			if(err) {
				console.log("Error in communityCtrl.allcommunities error: ", err);
				return res.status(500).send({error: "Error in operation, please try later..!"});
			}
			res.send(results);
		})

	} catch(err) {
		console.log("Unexpected error in fetching communities ", err);
		res.status(500).send({error: "Unexpected error occurred, try again later"});
	}
})

// router.post('/', (req, res) => {
// 	try {
// 	let communityData = req.body;
// 	controller.addcommunity(communityData)
// 	.then(() => { res.status('201').send({ message: 'Community created.' }); })
// 	.catch(() => { res.status('500').send({ message: `an error occurred` }); });
// 	} catch(err) {
// 		res.status('500').send({ message: 'Wrong Data Inputs' });
// 	}
// });

router.get('/:domain', (req,res) =>{
	try{
		communityCtrl.getcommunity((err, results) => {
			if(err) {
				console.log("Error in communityCtrl.allcommunities error: ", err);
				return res.status(500).send({error: "Error in operation, please try later..!"});
			}
			res.send(results);
		})

	} catch(err) {
		console.log("Unexpected error in fetching communities ", err);
		res.status(500).send({error: "Unexpected error occurred, try again later"});
	}
})

// router.patch('/:id', (req,res) => {
// 	try{
// 	controller.updatecommunity(req)
// 	.then(() => { res.status('202').send({ message: `Community updated.` }); })
// 	.catch(() => { res.status('500').send({ message: `an error occurred` }); });
// 	} catch(err) {
// 			res.status('500').send({ message: 'Wrong Data Inputs' });
// 	}
// });

module.exports = router;
