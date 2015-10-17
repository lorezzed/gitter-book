var gitter = require('./gitter');
var token = require('./token');

var roomId = 'ramda/ramda';

var callback = function (rooms) {
	rooms.map(isRoom(roomId));
	
	function isRoom(roomName) {
		return function(room) {
			console.log(roomName, '===', room.name);
			if(room.name === roomName) {
				console.log('listening to', roomName)
				gitter.stream(room.id, null, console.log);
			}
		}
	}
}


gitter.stream(null, token, callback);
