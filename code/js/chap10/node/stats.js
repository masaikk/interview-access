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

module.exports = {
    mean, stddev
}
