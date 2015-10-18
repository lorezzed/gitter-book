var R = require('ramda')
, 	S = require('sanctuary');
var gitter = require('./gitter')
, 	TOKEN = require('./token')
, 	ROOM_NAME = require('./roomName') || 'ramda/ramda';
var log = R.tap(console.log);



var listenToRoom = name => {
	var callback = lookupRoom(name);
	gitter.stream(null, TOKEN, callback);
}

var lookupRoom = name => rooms => {
	var hasName = roomName => room => room.name === roomName;
	var room = R.find(hasName(name))(rooms);
	log('listening to ' + room.name);
	gitter.stream(room.id, TOKEN, handleStream);
};

listenToRoom(ROOM_NAME);



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