/*
let F = function () {
};
let p = F.prototype;
let c = p.constructor;
console.log(c === F);//true
*/


class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    //类的方法之间不需要分号，并且也不需要function关键字
    includes(x) {
        return this.from <= x && x <= this.to;
    }

    * [Symbol.iterator]() {
        for (let x = Math.ceil(this.from); x <= this.to; x++) {
            yield x;
        }
    }//这个生成器方法让这个类可以迭代

    toString() {
        return `${this.from}...${this.to}`;
    }

    static parse(s) {
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if (!matches) {
            throw new TypeError(`cannot parse ${s}`)
        }
        return new Range(parseInt(matches[1]), parseInt(matches[2]));
    }
}

// let r = new Range(1, 5);
/*let r = Range.parse('(1...10)');
console.log(r.includes(4));//true
console.log([...r]) //[1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
if (!Range.prototype.fun) {
    Range.prototype.fun = function (s) {
        return s;
    }
}*/

function Span(start, span) {
    if (span >= 0) {
        this.from = start;
        this.to = start + span;
    } else {
        this.to = start;
        this.from = start + span;
    }
}

Span.prototype = Object.create(Range.prototype);
Span.prototype.constructor = Span;//定义自己构造函数
let s = new Span(1, 4);
console.log([...s]);
