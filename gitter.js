module.exports = {
    stream: stream
};

var https = require('https');

function stream(token, roomId) {
    if(!token)
        throw new Error('get a token from https://developer.gitter.im/apps');
    var hostname = roomId ? 'stream.gitter.im' : 'api.gitter.im';
    var path = roomId ? '/v1/rooms/'+roomId+'/chatMessages' : '/v1/rooms/';
    var heartbeat = ' \n';
    var options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };
    
    var req = https.request(options, function (res) {
        res.on('data', function (chunk) {
            var message = chunk.toString();
            if (message === heartbeat)
                return;
            console.log(JSON.parse(message));;
        });
    });
    
    req.on('error', function (e) {
        console.log('Something went wrong: ' + e.message);
    });
    
    req.end();
}