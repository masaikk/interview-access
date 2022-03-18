// let data = [1, 2, 3, 4, 5, null, undefined]
//
// console.log(data.filter((x, i) => i % 2 === 0));//[ 1, 3, 5, undefined ]

// let a = [1, [2, [3, [4]]]]
// console.log(a.flat(1));//[ 1, 2, [ 3, [ 4 ] ] ]
// console.log(a.flat(2));//[ 1, 2, 3, [ 4 ] ]
// console.log(a.flat(3));//[ 1, 2, 3, 4 ]
// console.log(a.flat(4));//[ 1, 2, 3, 4 ]


// let a = [1, 2, 3, 4, 5];
// console.log(a.slice(0, 3));//[1, 2, 3]
// console.log(a.slice(3));//[4, 5]
// console.log(a.slice(1, -1));//[2, 3, 4]

let a=[
    {'d1':100,'d2':3,'d3':'aerwa'},
    {'d1':5,'d2':5,'d3':'zzaa'},
    {'d1':12,'d2':3,'d3':'gg'},
    {'d1':-9,'d2':87,'d3':'sfaa'},
    {'d1':6,'d2':3,'d3':'aaa'},
]

let b=a.sort((a,b)=>{
    return a.d1>b.d1?1:-1;
})

console.log(b);
//[
//   { d1: 100, d2: 3, d3: 'aerwa' },
//   { d1: 5, d2: 5, d3: 'zzaa' },
//   { d1: 12, d2: 3, d3: 'gg' },
//   { d1: -9, d2: 87, d3: 'sfaa' },
//   { d1: 6, d2: 3, d3: 'aaa' }
// ]
