async function fn(){
    return '111'
}

async function outF(){
    // console.log(af);
    return await fn();
}

console.log(outF());
