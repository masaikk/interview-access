// let charsList = [..."abcd lbwnb"];
// console.log(charsList);//[ 'a', 'b', 'c', 'd', ' ', 'l', 'b', 'w', 'n', 'b']

/*let m = new Map();
ob = {};
m.set({}, 1);
m.set({}, 2);
m.set(ob, 3);

console.log([...m.entries()])
//[ [ {}, 1 ], [ {}, 2 ], [ {}, 3 ] ]*/


let iterable = [99];
let iterator = iterable[Symbol.iterator]();
for (let res = iterator.next(); !res.done; res = iterator.next()) {
    console.log(res.value); // 99
}
