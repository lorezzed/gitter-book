module.exports = {
    stream: stream
};

var https = require('https');

function stream(roomId, token, callback) {

    var hostname = roomId
        ? 'stream.gitter.im'
        : 'api.gitter.im';
    var path = roomId
        ? '/v1/rooms/' + roomId + '/chatMessages'
        : '/v1/rooms/';

    var options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };

    if (!callback)
        callback = function (data) { console.log(data); };

    var req = https.request(options, function (res) {
        var cache = '';
        res.on('data', function (chunk) {
            var message = chunk.toString();
            var heartbeat = ' \n';
            if (message === heartbeat)
                return;
            cache += message;
            try {
                var parsed = JSON.parse(cache);
                cache = '';
                callback(parsed);
            }
            catch (exception) {
                // noop: stream is split
            }
        });
    });

    req.on('error', function (e) {
        console.log('Something went wrong: ' + e.message);
    });

    req.end();
}