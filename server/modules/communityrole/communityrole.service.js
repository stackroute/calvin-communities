const express = require('express');

const model = require('cassandra-driver');

const connectionString = require('../../connect');

var client = new model.Client({ 
									contactPoints: [connectionString.contact],
													protocolOptions: { port: connectionString.port },
													keyspace: connectionString.keyspace,
								 });

	function getcommunityrole(callback)
	{
		let query = ('select * from communityroles');

		return client.execute( query, (err, result) =>{
			callback(err,result)});
	}

	function postcommunityrole(data,callback){
		let query = (`INSERT INTO communityroles (domain,actions,role) VALUES (?, ?, ?)`);
		let param = [data.domain, data.actions, data.role];
		return client.execute( query, param,{hints:['text','map','text']}, (err) =>{
			callback(err)});
	} 

	function patchcommunityrole(data,value,callback){
		let query = (`UPDATE communityroles SET actions=actions+ ? where domain=? AND role=?`);
		let param = [data.actions,value.domain,value.role];
		return client.execute( query, param,{hints:['map','text','text']}, (err) =>{
			callback(err)});
	}

module.exports = {getcommunityrole,postcommunityrole,patchcommunityrole};