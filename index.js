var R = require('ramda')
	, S = require('sanctuary');
var gitter = require('./gitter')
	, token = require('./token')
	, roomName = require('./roomName') || 'ramda/ramda';

var log = R.tap(console.log);


var listenRoom = id => {
	var callback = rooms => {
		var isRoom = roomName => room => room.name === roomName;
		var room = rooms.filter(isRoom(id))[0];
		if (!room)
			log('nothing found for ' + room.name);
		log('listening to ' + room.name);
		gitter.stream(room.id, token, handleStream);
	};

	gitter.stream(null, token, callback);
}

listenRoom(roomName);

var handleStream = stream => {
	try {
		var username = R.path(['fromUser', 'username']);
		var message = R.prop('text');
		var output = R.converge(R.unapply(R.join(': ')), [username, message]);
		var program = R.pipe(output, log);
		program(stream);
	}
	catch (e) {
		log(e);
	}

}