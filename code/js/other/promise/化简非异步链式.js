/*new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    return new Promise((resolve, reject) => {
        resolve()
    })
}).then(() => {
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    return new Promise((resolve, reject) => {
        resolve()
    })
}).then(() => {
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
})*/


new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');

}).then(() => {
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    throw "x出现错误，调用catch"
    console.log('第二层');

}).then(() => {
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
}).catch((err)=>{
    console.log(err);
})
