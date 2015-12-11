var events = require('events');
var eventsEmitter = new events.EventEmitter();

function connectHandler(para) {
    console.log('连接成功', para);
    eventsEmitter.emit('a_event', 'a_event_para1', 'a_event_para2');
}

eventsEmitter.on('ready', connectHandler);
eventsEmitter.on('a_event', function (para1, para2) {
    console.log('this is a a_event', para1, '  --  ' + para2);
});

eventsEmitter.emit('ready', 'ready param');
console.log('程序执行完毕');

