var R = require('ramda')
,	S = require('sanctuary');
var gitter = require('./gitter')
,	token = require('./token');

var log = R.tap(console.log);

var roomId = 'ramda/ramda';

listenRoom(roomId);

function listenRoom(id) {
	gitter.stream(null, token, callback);
	
	function callback (rooms) {
		rooms.map(isRoom(id));
		
		function isRoom(roomName) {
			return function(room) {
				// console.log(roomName, '===', room.name);
				if(room.name !== roomName)
					return
				console.log('listening to', roomName)
				gitter.stream(room.id, token, handleStream);
			}
		}
	}
}



function handleStream(stream) {
	try {
		var username = R.path(['fromUser', 'username']);
		var message = R.prop('text');
		var output = R.converge(R.unapply(R.join(': ')), [username, message]);
		var program = R.pipe(output, log);
		program(stream);
	}
	catch(e) {
		log(e);
	}
	
}