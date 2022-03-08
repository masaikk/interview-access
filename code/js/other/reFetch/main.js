function getNumberParts(number) {
    const rnumber = /(\d+)\.(\d+)/;
    const matches = number.match(rnumber);
    if (matches === null) {
        return null;
    }

    const [, ...captures] = number.match(rnumber);
    return captures;
}

(() => {
    console.log(getNumberParts('1234.56'));
    //[ '1234', '56' ]
})()
