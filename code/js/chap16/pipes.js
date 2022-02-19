function pipe(readable, writable, callback) {
    function handleError(err) {
        readable.close();
        writable.close();
        callback(err);
    }

    readable.on('error', handleError).pipe(writable).on('error', handleError).on('finish', callback)
}
