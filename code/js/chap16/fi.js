const fs = require('fs');
let buffer = fs.readFileSync('test.data.txt');//同步操作，返回一个缓冲区
let text = fs.readFileSync('data.csv', 'utf8');//同步操作，返回一个字符串

//异步操作
fs.readFile('test.data', (err, buffer) => {
    if (err) {
        // 在此处理错误
    } else {
        // 在这里进行正常的操作
    }
});

//异步操作，返回一个promise
fs.promises.readFile('data.csv', 'utf8').then().catch();
