var http = require('http');
var host ='127.0.0.1';
var port ='3000';
var io = require('socket.io').listen(3000);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url='mongodb://127.0.0.1/test';

MongoClient.connect(url,function(err,db) {
	assert.equal(null,err);
	var collection = db.collection('test');
	console.log("Connected");
	io.sockets.on('connection',function(socket) {
		socket.on('mouse_activity',function(data) {
				collection.insert(data);
				console.log(data);			
		});
	});	
});


