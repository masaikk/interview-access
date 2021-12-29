let F = function () {
};
let p = F.prototype;
let c = p.constructor;
console.log(c === F);//true
