var R = require('ramda')
,	S = require('sanctuary');
var gitter = require('./gitter')
,	token = require('./token');
var roomId = 'lorezzed/sup';
// var roomId = 'ramda/ramda';

listenRoom(roomId);

function listenRoom(id) {
	gitter.stream(null, token, callback);
	
	function callback (rooms) {
		rooms.map(isRoom(id));
		
		function isRoom(roomName) {
			return function(room) {
				console.log(roomName, '===', room.name);
				if(room.name !== roomName)
					return
				console.log('listening to', roomName)
				gitter.stream(room.id, token, handleStream);
			}
		}
	}
}

function handleStream(stream) {
	// console.log(stream);
	var name = stream.fromUser.username;
	var message = stream.text;
	console.log('%s: %s', name, message);
}