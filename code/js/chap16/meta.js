const fs = require('fs')

//console.log(__filename);
// /home/b8313/Desktop/interview-access/code/js/chap16/meta.js

let stat = fs.statSync(__filename);

console.log(stat.mode.toString(8));
console.log(stat.size);
