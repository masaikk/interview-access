# KOA2使用

看书笔记，了解koa使用。

基本代码位于[masaikk/jkoas (gitee.com)](https://gitee.com/masaikk/jkoas)。使用koa2+typescript+tensorflowjs。

还有一个小项目，位于[https://gitee.com/masaikk/server-monitor](https://gitee.com/masaikk/server-monitor)

---

## KOA与Nodejs开发实战

### koa基本属性方法

获取上下文context属性：

```typescript
app.use(async (ctx: any) => {
    ctx.response.body = {
        url: ctx.request.url,
        query: ctx.request.query,
        querystring: ctx.request.query
    }
});
```

访问``[127.0.0.1:3000/?a=1&b=2](http://127.0.0.1:3000/?a=1&b=2)``

可以得到输出``{"url":"/?a=1&b=2","query":{"a":"1","b":"2"},"querystring":{"a":"1","b":"2"}}``.

---

## 杂项知识点

### koa异步的ctx使用

参考[https://blog.csdn.net/blwinner/article/details/109853004](https://blog.csdn.net/blwinner/article/details/109853004)，对异步函数封装promise。

```javascript
const exec = require('child_process').exec;
const al = async () => {
    return new Promise((resolve, reject) => {
        exec('echo a1', (err, stdout, stderr) => {
                if (err) {
                    throw err;
                } else {
                    resolve(stdout)
                }
            }
        )
    })
}

module.exports = async (ctx, next) => {
    let bodyMess = await al()
    ctx.response.code = 200
    ctx.response.body = bodyMess

}
```

---

 

