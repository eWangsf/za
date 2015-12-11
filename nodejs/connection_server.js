var net = require('net');

var server = net.createServer(function (connection) {
    console.log('client is connect');
    connection.on('end', function () {
        console.log('客户端关闭连接');
    });
    connection.write('Hello World\n');
    connection.pipe(connection);
});

server.listen(3333, function() {
    console.log('server is listening');
});





