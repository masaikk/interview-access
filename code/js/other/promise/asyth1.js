async function fn(){
    return new Promise((resolve, reject) => {
        resolve('inner')
    }).then(value => {
        console.log(value);
    }).finally(() => {
        console.log('end of promise');
    })
}

console.log(fn());


