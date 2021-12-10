// let data = [1, 2, 3, 4, 5, null, undefined]
//
// console.log(data.filter((x, i) => i % 2 === 0));//[ 1, 3, 5, undefined ]

let a = [1, [2, [3, [4]]]]
console.log(a.flat(1));//[ 1, 2, [ 3, [ 4 ] ] ]
console.log(a.flat(2));//[ 1, 2, 3, [ 4 ] ]
console.log(a.flat(3));//[ 1, 2, 3, 4 ]
console.log(a.flat(4));//[ 1, 2, 3, 4 ]
