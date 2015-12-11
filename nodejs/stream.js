var fs = require('fs');

// var data = '';
// var readableStream = fs.createReadStream('wenben.txt');
// readableStream.setEncoding('utf-8');
// readableStream.on('data', function (chunk) {
//     console.log('.......data......');
//     data += chunk;
// });
// readableStream.on('error', function (err) {
//     console.log('.......error......');
//     console.log(err.stack());
// });
// readableStream.on('end', function () {
//     console.log('.......end......');
//     console.log(data);
// });

// var data = '这里是输出文本--------';
// var writeableStream = fs.createWriteStream('output.txt');
// writeableStream.write(data + 'jdcsk', 'utf-8');
// writeableStream.end();
// writeableStream.on('finish', function () {
//     console.log('........finish.......');
// });
// writeableStream.on('error', function (err) {
//     console.log('........error........');
//     console.log(err.stack());
// });


// var readableStream = fs.createReadStream('wenben.txt');
// var writeableStream = fs.createWriteStream('output.txt');
// readableStream.pipe(writeableStream);


var zlib = require('zlib');
fs.createReadStream('wenben.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('output.txt.gz'));




console.log('程序执行完毕');



