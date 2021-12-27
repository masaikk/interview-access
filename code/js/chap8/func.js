// let squared = (function (x) {
//     return x * x;
// }(10))
// console.log(squared)
// //100


// const strict = (function () {
//     return !this;
// }());


/*let o = {
    m: function () {
        let self = this;
        this === o;  // true
        f();

        const f = (function () {
            this === o; // ture
        }).bind(this)
    }
};
o.m();*/


// function max(first = -Infinity, ...rest) {
//     let maxValue = first;
//
//     for (let n of rest) {
//         if (n > maxValue) {
//             maxValue = n;
//         }
//     }
//     return maxValue;
// }


/*uniqueInteger.counter=0;

function uniqueInteger(){
    return uniqueInteger.counter++;
}

console.log(uniqueInteger()); //0
console.log(uniqueInteger()); //1
console.log(uniqueInteger); // [Function: uniqueInteger] { counter: 2 }*/

/*function factorial(n) {
    if (Number.isInteger(n) && n > 0) {
        if (!(n in factorial)) {
            factorial[n] = n * factorial(n - 1);

        }
        return factorial[n];
    } else {
        return NaN;
    }
}

factorial[1]=1;
console.log(factorial(6));//720
console.log(factorial[5]);//120
console.log(factorial);*/
/*[Function: factorial] {
    '1': 1,
        '2': 2,
        '3': 6,
        '4': 24,
        '5': 120,
        '6': 720
}*/

// let scope = 'global';
// function checkScope(){
//     let scope = 'local';
//     function f(){
//         return scope;
//     }
//     return f;
// }
// console.log(checkScope()()); // local

function f(y) {
    return this.x + y;
}// 需要绑定

let o = {x: 1};
let g = f.bind(o);
console.log(g(2));// 3
let p = {x: 10, g, f};
console.log(p.g(2));// g 仍然绑定到o，输出3
console.log(p.f(2)); // 12
