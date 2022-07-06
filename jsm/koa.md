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

### ctx抛出错误

```typescript
const getError = async (ctx: any) => {
  ctx.throw(500);
};
export { getError };
```

返回一个 **Internal Server Error**。

### koa的静态资源中间件

```typescript
const staticMiddle = require("koa-static");
const path = require("path");

app.use(staticMiddle(path.join(__dirname, "../../static")));
```

初始化的时候就使用静态资源的文件夹。

使用时url类似于``http://127.0.0.1:3000/yuka.jpg``



---

###  koa的跨域解决问题

添加代码块当做跨域处理的中间件。

```javascript
/**
 * CORS middleware for koa2: https://github.com/zadzbw/koa2-cors/blob/master/src/index.js
 *
 * @param {Object} [options]
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
 *  - {Array} exposeHeaders `Access-Control-Expose-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 *  - {Array} allowMethods `Access-Control-Allow-Methods`,
 *    default is ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
 *  - {Array} allowHeaders `Access-Control-Allow-Headers`
 * @return {Function}
 * @api public
 */
module.exports = function crossOrigin(options = {}) {
    const defaultOptions = {
        allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    };

    // set defaultOptions to options
    options = Object.assign({}, defaultOptions, options); // eslint-disable-line no-param-reassign

    // eslint-disable-next-line consistent-return
    return async function cors(ctx, next) {
        // always set vary Origin Header
        // https://github.com/rs/cors/issues/10
        ctx.vary('Origin');

        let origin;
        if (typeof options.origin === 'function') {
            origin = options.origin(ctx);
        } else {
            origin = options.origin || ctx.get('Origin') || '*';
        }
        if (!origin) {
            return await next();
        }

        // Access-Control-Allow-Origin
        ctx.set('Access-Control-Allow-Origin', origin);

        if (ctx.method === 'OPTIONS') {
            // Preflight Request
            if (!ctx.get('Access-Control-Request-Method')) {
                return await next();
            }

            // Access-Control-Max-Age
            if (options.maxAge) {
                ctx.set('Access-Control-Max-Age', String(options.maxAge));
            }

            // Access-Control-Allow-Credentials
            if (options.credentials === true) {
                // When used as part of a response to a preflight request,
                // this indicates whether or not the actual request can be made using credentials.
                ctx.set('Access-Control-Allow-Credentials', 'true');
            }

            // Access-Control-Allow-Methods
            if (options.allowMethods) {
                ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','));
            }

            // Access-Control-Allow-Headers
            if (options.allowHeaders) {
                ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','));
            } else {
                ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
            }

            ctx.status = 204; // No Content
        } else {
            // Request
            // Access-Control-Allow-Credentials
            if (options.credentials === true) {
                if (origin === '*') {
                    // `credentials` can't be true when the `origin` is set to `*`
                    ctx.remove('Access-Control-Allow-Credentials');
                } else {
                    ctx.set('Access-Control-Allow-Credentials', 'true');
                }
            }

            // Access-Control-Expose-Headers
            if (options.exposeHeaders) {
                ctx.set('Access-Control-Expose-Headers', options.exposeHeaders.join(','));
            }

            try {
                await next();
            } catch (err) {
                throw err;
            }
        }
    };
};
```

然后在主app中导入``const cors = require('./utils/koa_cors');``，使用这个中间件：

```javascript
// cors
app.use(cors({
    origin: (ctx) => ctx.request.header.origin,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(router.routes())
```

或者直接使用三方库

```shell
npm install @koa/cors --save
```

然后使用

```javascript
const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());
```

参考[@koa/cors - npm (npmjs.com)](https://www.npmjs.com/package/@koa/cors)

---



