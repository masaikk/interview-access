/*
let m = new Map();
ob = {};
m.set({}, 1);
m.set({}, 2);
m.set(ob, 3);
console.log(m.size);//3
console.log(m.get({}));//undefined
console.log(m.get(ob));//3

console.log([...m.entries()])
*/


let o = {
    x: 1,
    y: 2
}

let m = new Map(Object.entries(o))
console.log(m);//Map(2) { 'x' => 1, 'y' => 2 }

console.log([...m.keys()]);//[ 'x', 'y' ]
console.log([...m.values()]);//[ 1, 2 ]
console.log([...m.entries()]);//[ [ 'x', 1 ], [ 'y', 2 ] ]
console.log([...m]);//[ [ 'x', 1 ], [ 'y', 2 ] ]
