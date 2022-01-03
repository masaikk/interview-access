const stats = (function () {
    const sum = (x, y) => x + y;
    const square = x => x * x;

    function mean(data) {
        return data.reduce(sum) / data.length;
    }

    function stddev(data) {
        let m = mean(data);
        return Math.sqrt(
            data.map(x => x - m).map(square).reduce(sum) / (data.length - 1)
        );
    }

    return {mean, stddev};
}());

// console.log(stats.mean([1, 3, 5, 9, 7]));//5
// console.log(stats.stddev([1, 3, 5, 7, 9]));//3.1622776601683795
console.log(stats);
