# bilibilidownloader

[lecepin/bilibili-download: 超简单B站视频下载工具。安装即可使用，无需任何环境配置，无需登录，默认画质 1080P，mp4 格式。 (github.com)](https://github.com/lecepin/bilibili-download)

---

使用了两个axios分别对于音频和视频进行下载。

参考代码

```javascript
function downloadBFile(url, fullFileName, progressCallback) {
  return axios
    .get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
        referer: 'https://www.bilibili.com',
      },
    })
    .then(({ data, headers }) => {
      let currentLen = 0;
      const totalLen = headers['content-length'];

      return new Promise((resolve, reject) => {
        data.on('data', ({ length }) => {
          currentLen += length;
          progressCallback?.(currentLen / totalLen);
        });

        data.pipe(
          fs.createWriteStream(fullFileName).on('finish', () => {
            resolve({
              fullFileName,
              totalLen,
            });
          }),
        );
      });
    });
}
```

