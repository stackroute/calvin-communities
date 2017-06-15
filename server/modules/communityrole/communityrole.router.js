const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const service = require('./communityrole.service');
// const model = require('cassandra-driver');
const controller = require('./communityrole.controller');
//const connectionString = require('../../connect');
//var client = new model.Client({ 
									// contactPoints: [connectionString.contact],
									// 				protocolOptions: { port: connectionString.port },
									// 				keyspace: connectionString.keyspace,
								 // });



const router = express.Router();

/*router.get('/', (req, res) =>{
	try{
		res.send(controller.getcommunityrole(req, res));
	}
	catch (err){
		res.send({error: 'Unexpected error from get method....please try later'});
	}
});*/

router.get('/',controller.getcommunityrole);

router.post('/',controller.postcommunityrole);

router.patch('/:domain/:role',controller.patchcommunityrole);
	

module.exports = router;