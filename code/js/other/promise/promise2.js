new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('111argu');
        console.log('after resolve');
        reject('reject')
    },1000)
}).then((s)=>{
    console.log('then ');
    console.log(s)
}).catch((e)=>{
    console.log(e);
}).finally(()=>{
    console.log('finally');
})
