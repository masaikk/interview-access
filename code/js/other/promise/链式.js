setTimeout(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    setTimeout(() => {
        console.log('第二层');
        console.log('第二层');
        console.log('第二层');
        console.log('第二层');
        setTimeout(() => {
            console.log('第三层');
            console.log('第三层');
            console.log('第三层');
            console.log('第三层');
        }, 1000)
    }, 1000)
}, 1000)
