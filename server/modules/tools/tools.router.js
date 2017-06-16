/* ---------------------ROUTER----------------------*/


const router = require('express').Router();

const communityToolCtrl = require('./tools.controller');


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

router.get('/:domainname', (req, res) => {
	try{
		let domainName = req.params.domainname;
		communityToolCtrl.getTools(domainName, (err, results) => {
			if(err) {
				console.log("Error in communityToolCtrl.getTools error: ", err);
				return res.status(500).send({error: "Error in operation, please try later..!"});
			}

			res.send(results);
		});

	} catch (err) {
		console.log("Unexpected error in fetching community roles ", err);
		res.status(500).send({error: "Unexpected error occurred, please try again...!"});
	}
});

router.post('/',(req, res) => {  
    try{
		let dataFromBody=req.body;
    console.log(dataFromBody);
		communityToolCtrl.postTools(dataFromBody, (err, results) => {
			if(err) {
				console.log("Error in communityToolCtrl.postTools error: ", err);
				return res.status(500).send({error: "Error in operation, please try later..!"});
			}

			res.send(results);
		});

	} catch (err) {
		console.log("Unexpected error in fetching community roles ", err);
		res.status(500).send({error: "Unexpected error occurred, please try again...!"});
	}
});

router.patch('/:domain/:tool',(req, res) => {
    try {
   return controller.modifyTool(req,res);
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }    
});

router.delete('/:domain', (req,res)=> { 
    try {
   return res.send(controller.deleteTool(req,res));
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }  
});

router.delete('/action/:domain/:tool/:name', (req,res)=> {
    try {
   return res.send(controller.deleteAction(req,res));
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }  
});

router.delete('/event/:domain/:tool/:name', (req,res)=> {
    try {
   return res.send(controller.deleteEvent(req,res));
}
catch (err) {
   return res.status(404).json({ error: 'Unexpected internal error occurred, please try later...!' });
  }  
});


module.exports = router;
