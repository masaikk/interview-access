// const stats = require('./stats');
const {stddev: ddd} = require('./stats');//解构对象的重命名
const data = [1, 3, 5, 9, 7];
// console.log(stats.mean(data));
console.log(ddd(data));//3.1622776601683795
