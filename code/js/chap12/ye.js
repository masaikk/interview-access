/*
let o={
    x:1,y:2,z:3,
    *g(){
        for(let key of Object.keys(this)){
            yield key;
        }
    }
};

console.log([...o.g()])
//[ 'x', 'y', 'z', 'g' ]*/


function* fibonacci() {
    let x = 0, y = 1;
    for (; ;) {
        yield y;
        [x, y] = [y, x + y];
    }
}

function * take(n,iterable){
    let it=iterable[Symbol.iterator]();
    while (n-->0){//n是循环的次数
        let next=it.next();
        if(next.done)
            return;
        else
            yield next.value;

    }
}

console.log([...take(5, fibonacci())]);
//[ 1, 1, 2, 3, 5 ]