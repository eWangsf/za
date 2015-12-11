var http = require('http');
var url = require('url');

function start(func) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('requeste for pathname:', pathname, 'received');

        func(pathname);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        // response.write('Hello World');
        // response.end();
        response.end('Server Ready\n');
    }

    http.createServer(onRequest).listen(2222);
    console.log('server started');
}

exports.start = start;

