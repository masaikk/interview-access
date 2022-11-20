# node

这里是node底层的学习笔记，包括v8引擎以及node服务端的知识

## v8引擎

<img src="node.assets/v2-4dce785ff4595de55623611ab0055d33_1440w.jpg" alt="认识 V8 引擎" style="zoom:33%;" />

### v8引擎原理

参考[认识 V8 引擎 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/27628685)

![img](node.assets/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC80LzI1LzE3MWIwNzkzMGNiNzViNTc)

webkit调用v8的结构

![preview](node.assets/v2-ad0a86d3faf223164a9bd22658feadc3_r.jpg)

首先是网页内容，输入到HTML解析器，HTML解析器解析，然后构建DOM树，在这期间如果遇到JavaScript代码则交给JavaScript引擎处理；如果来自CSS解析器的样式信息，构建一个内部绘图模型。该模型由布局模块计算模型内部各个元素的位置和大小信息，最后由绘图模块完成从该模型到图像的绘制。

而具体在v8引擎中：

源代码-→抽象语法树-→字节码-→JIT-→本地代码(V8引擎没有中间字节码)。

*在运行JavaScript之前，相比其它的JavaScript的引擎转换成字节码或解释执行，V8将其编译成原生机器码（IA-32, x86-64, ARM, or MIPS CPUs），并且使用了如内联缓存（inline caching）等方法来提高性能。*

---

### v8的内存回收

---

### v8的promise

---

## webkit

## NestJS

参考掘金小册[NestJS 项目实战 - CookieBoty - 掘金小册 (juejin.cn)](https://juejin.cn/book/7065201654273933316)使用`nest new mynest`创建一个叫做mynest的项目，在此之前需要安装cli工具`npm install -g @nestjs/cli`。我的代码位于[mynest: nestjs的demo (gitee.com)](https://gitee.com/masaikk/mynest)。运行之后打开http://127.0.0.1:3000/可以看到：

![image-20221101164213248](node.assets/image-20221101164213248.png)

### 建立controller

使用`nest g co u1`建立一个名叫u1的controller，并且这个命令会自动在app.module.ts进行注册。

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { U1Controller } from './u1/u1.controller';

@Module({
  imports: [],
  controllers: [AppController, U1Controller],
  providers: [AppService],
})
export class AppModule {}

```

如果不需要生成spec文件，就需要在nest-cli.json中添加属性，参考

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "generateOptions": {
    "spec": false
  }
}

```

在对应u1的controller中修改到如下内容

```typescript
import { Controller, Get } from "@nestjs/common";

@Controller("u1")
export class U1Controller {
  @Get()
  getHello(): string {
    return "hello u1";
  }
}

```

浏览器中打开[127.0.0.1:3000/u1](http://127.0.0.1:3000/u1)，可以get到字符串：

![image-20221101182231234](node.assets/image-20221101182231234.png)

也可以添加Get装饰器，添加一个新的路由

```typescript
import { Controller, Get } from "@nestjs/common";

@Controller("u1")
export class U1Controller {
  @Get()
  getHello(): string {
    return "hello u1";
  }

  @Get("another")
  getAnother(): string {
    return "another greet";
  }
}

```

![image-20221120191040655](node.assets/image-20221120191040655.png)

或者直接使用`@Body()`装饰器来获取body。

如果使用RESTful的动态路由，也可以使用`@Param`装饰器来获取值，类似与官方文档中的：

```typescript
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }
```



### 建立CURD

可以使用如下命令创建一个CURD：`nest g resource user `，选择RESTful类型的，这个情况是使用请求的方式来判断具体的操作的，打开[127.0.0.1:3000/user](http://127.0.0.1:3000/user)，对应到这里

```typescript
@Get()
  findAll() {
    return this.userService.findAll();
  }
```

展示：

![image-20221101182936970](node.assets/image-20221101182936970.png)

需要注意的是，创建单独的controller以及CRUD应用，在app.module里面的注册是不同的，参考以上的两个的注册为一个在imports中一个在controllers中。

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { U1Controller } from './u1/u1.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, U1Controller],
  providers: [AppService],
})
export class AppModule {}
```

对于一个controller来说，可以在参数中使用@Request或者@Query装饰器来获取request或者query，例如

```typescript
  @Get()
  @Version("3")
  fundAll3(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.name,
    };
  }
```

![image-20221121000311929](node.assets/image-20221121000311929.png)

可以通过query对象来获取到message的值。注意它们是针对get请求来说的。

针对于post请求，可以使用requset.body的形式。类似于：

```typescript
  @Post()
  @Version("2")
  create2(@Request() req) {
    console.log(req.body);
    return {
      code: 200,
    };
  }
```

![image-20221121001232713](node.assets/image-20221121001232713.png)

### 创建Api版本号

对于一个api来说，它的内部实现以及返回可能会变，所以可以添加版本号来标识api的不同。比如一开始的[127.0.0.1:3000/user](http://127.0.0.1:3000/user)可以变为[127.0.0.1:3000/v1/user](http://127.0.0.1:3000/v1/user)。

首先在main.ts中导入版本库

```typescript
import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000);
}

bootstrap();

```

然后对于controller的方法，添加version装饰器

```typescript
  @Get()
  @Version("1")
  findAll() {
    return this.userService.findAll();
  }
```

使用[127.0.0.1:3000/v1/user](http://127.0.0.1:3000/v1/user)访问得到：

![image-20221110201209800](node.assets/image-20221110201209800.png)

如果想创建更多不同version的api，需要修改mian.ts的配置，比如说添加v1以及v2版本的api如下：

```typescript
import { VERSION_NEUTRAL, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, "1", "2"],
  });

  await app.listen(3000);
}

bootstrap();

```

添加controller的第二个findAll方法

```typescript
  @Get()
  @Version("2")
  findAll2() {
    return "version 2 find all";
  }
```

使用[127.0.0.1:3000/v2/user](http://127.0.0.1:3000/v2/user)获取：

![image-20221110203948386](node.assets/image-20221110203948386.png)



