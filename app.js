var MongoClient = require('mongodb').MongoClient;
var url='mongodb://127.0.0.1/test'; 
var assert = require('assert');
var io = require('socket.io').listen(3000);

MongoClient.connect(url,function(err,db) {
	io.sockets.setMaxListeners(0);
	assert.equal(null,err);
	console.log("Connected");

var allinfo = db.collection('test').aggregate([
{
	$group:
	{
		_id: "$x",
		y: { $first: "$y" },
		x: { $first: "$x" },
		count: {$sum:1}
    }  
}]);

   allinfo.each(function(err,result){
	   assert.equal(err,null);
	   console.log(result);
	
	io.sockets.on('connection',function(socket){
	socket.broadcast.emit('all_mouse_activity',{session_id: socket.id, coords: result });
    });
   });
  });


  



