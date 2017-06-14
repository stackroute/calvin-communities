const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const service = require('./community.service');
const model = require('cassandra-driver');


const connectionString = require('../../connect');
var client = new model.Client({ 
									contactPoints: [connectionString.contact],
													protocolOptions: { port: connectionString.port },
													keyspace: connectionString.keyspace,
								 });



const router = express.Router();

router.use(function(req, res, next) {
	
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
  next();
});


router.route('/')
	.get((req,res) => {
		let query = ('select * from community');
		 client.execute( query, (err, result) => {
  			if (err) throw console.log(err)
 			 res.send(result.rows);
		})
		
	}).post((req,res) => {
		//res.send(req.body.name);
		//let query = ('INSERT INTO community (c_id, c_name, owner_id) VALUES (blobAsBigint(toTimestamp(now())),\''+req.body.c_name+'\',\''+req.body.owner_id+'\')');
		//let param = [req.body.name, req.body.user_id];
		//xconsole.log(param);
		let query = ('INSERT INTO community2 (c_id, c_name, owner_id) VALUES ( ? , ? , ?  )');
		let param = [ model.types.Uuid.random().toString().split('-').join(''), req.body.c_name, req.body.owner_id];
		console.log(param);
		client.execute( query, param, (err, result) => {
		if(err) throw console.log(err);
			res.status(200).send();

		})

	})

router.route('/:id')
	.get((req,res) => {
		 let query = ('select * from community where id=?');
 		client.execute(query,[req.params.id], (err, result) => {
			if(err) throw console.log(err)
				res.send(result.rows);
		})
	})
	.put((req,res) => {
		let query = ('update users set ');
	})



module.exports = router;