function importScript(url) {
    return new Promise((resolve, reject) => {
        let s = document.createElement('script');
        s.onload = () => {
            resolve();
        }
        s.onerror = (e) => {
            reject(e);
        }
        s.src = url;
        document.head.append(s);
    })
}
