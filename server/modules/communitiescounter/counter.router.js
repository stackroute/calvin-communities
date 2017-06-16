const router = require('express').Router();





const counterCtrl = require('./counter.controller');

/*
 * Effective URI of the API is GET /counter/:domainname
 *
 * API for returning members,invite,requests,tolls count of a specified community
 *
 * URL Parameter
 *  - Domain Name: specify a specific domain name, to get the counter incresed
 *
 */

router.get('/:domain', function(req,res){
	try{
		let domain= req.params.domain;
		// console.log(domain);
		counterCtrl.getcounter(domain,(err,results)=>{
			if (err){
				console.log("error in getting the count for the pacticular domain",err);
				return res.status(500).send({error:"error in operation,please try later ...!"});
			}
			res.send(results);
		});
	}catch(err){
		console.log("Unexpected error in returning the count values",err);
		res.status(500).send({error:"unexpected error occured, please try again ...!"});
	}
});
// router.patch('/increment/member/:id', controller.incrementmember);
// router.patch('/increment/invitation/:id', controller.incrementinvitation);
// router.patch('/increment/tool/:id', controller.incrementtools);
// router.patch('/increment/requests/:id', controller.incrementrequests);
// router.patch('/decrement/tool/:id', controller.decrementtools);
// router.patch('/decrement/member/:id', controller.decrementmember);
// router.patch('/decrement/invitation/:id', controller.decrementinvitation);
// router.patch('/decrement/requests/:id', controller.decrementrequests);


module.exports = router;
