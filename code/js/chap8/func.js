// let squared = (function (x) {
//     return x * x;
// }(10))
// console.log(squared)
// //100


// const strict = (function () {
//     return !this;
// }());


let o = {
    m: function () {
        let self = this;
        this === o;  // true
        f();

        const f = (function () {
            this === o; // ture
        }).bind(this)
    }
};
o.m();
