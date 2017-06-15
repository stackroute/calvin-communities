const express = require('express');

const model = require('cassandra-driver');

const connectionString = require('../../connect');
var client = new model.Client({ 
									contactPoints: [connectionString.contact],
													protocolOptions: { port: connectionString.port },
													keyspace: connectionString.keyspace,
								 });




// router.use(function(req, res, next) {
	
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
//   next();
// });


	function getcommunityrole(callback)
	{
		let query = ('select * from communityroles');

		return client.execute( query, (err, result) =>{
			console.log("Result from service GET"+ result);
			callback(err,result)});
	}

	function postcommunityrole(data,callback){
		let query = (`INSERT INTO communityroles (domain,actions,role) VALUES (?, ?, ?)`);
		let param = [data.domain, data.actions, data.role];
		return client.execute( query, param,{hints:['text','map','text']}, (err) =>{
			console.log("Result from service POST ");
			callback(err)});
	} 

	function patchcommunityrole(data,value,callback){
		let query = (`UPDATE communityroles SET actions=actions+ ? where domain=? AND role=?`);
		let param = [data.actions,value.domain,value.role];
		return client.execute( query, param,{hints:['map','text','text']}, (err) =>{
			callback(err)});
	}
// 	.post((req,res) => {
// 		//res.send(req.body.c_name);
// //		let query = ('insert into users values(user_id, age, city) values(blobAsBigint(toTimestamp(now())),'+req.body.name+','+req.body.user_id+'');
// 		let query = ('INSERT INTO communityrole (domain,actions,role) VALUES (?, ?, ?)');
// 		let param = [req.body.domain, req.body.actions, req.body.role];
// 		//let param = [req.body.c_name];
// 		//console.log(param);

// 		client.execute( query, param,{hints:['text','map','text']}, (err, result) => {
// 		if(err) throw console.log(err)
// 				res.send('added');

// 		})

// 	});
// router.route('/:id')
// 	.get((req,res) => {
// 		 let query = ('select * from community where c_id=?');
//  		client.execute(query,[req.params.c_id], (err, result) => {
// 			if(err) throw console.log(err)
// 				res.send(result.rows);
// 		})
// 	})
	// .put((req,res) => {
	// 	let query = ('UPDATE community SET owner_id='' WHERE c_id=?');
	// 	client.execute(query,[request.params.c_id], (err, result) => {
	// 		if(err) throw console.log(err);
	// 			res.send(result)
	// 	})
	// })
	// .delete((req,res) => {
	// 	let query = ('UPDATE community SET owner_id='' WHERE c_id=?');
	// 	client.execute(query,[request.params.c_id], (err, result) => {
	// 		if(err) throw console.log(err);
	// 			res.send(result)
	// 	})
	// });



module.exports = {getcommunityrole,postcommunityrole,patchcommunityrole};