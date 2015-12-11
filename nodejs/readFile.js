
var fs = require('fs');
fs.readFile('wenben.txt', function (err, data) {
    if(err) {
        console.log(err.stack);
        return;
    }
    console.log('success');
    console.log(data.toString());
});
console.log('程序执行完毕');



