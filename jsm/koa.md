# KOA2使用

看书笔记，了解koa使用。代码位于[masaikk/jkoas (gitee.com)](https://gitee.com/masaikk/jkoas)。使用koa2+typescript+tensorflowjs

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

