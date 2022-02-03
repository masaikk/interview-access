# 学习typescript

这里是Vue3网课的TS部分的笔记。代码仓库位于[tms: Typescript学习 (gitee.com)](https://gitee.com/masaikk/tms)。

### 作用域问题

对于同一目录下面的ts文件，编译器视为同一作用域，这就意味着不同文件中取名相同的变量会冲突。这就需要标定某个文件为块级作用域。应该在文件中写上代码

```typescript
export {}
```

### 使用ts-node安装typescript运行环境

```shell
npm install ts-node tslib @types/node --save
```

### 使用webpack安装typescript运行环境

1. 先进入文件夹，使用npm init初始化package.json。

   ![image-20220203164510580](ts.assets/image-20220203164510580.png)

2. 安装依赖

   ```shell
   npm install webpack webpack-cli ts-loader -D
   ```

   添加webpack.config.js并且加入build命令.

   ```javascript
   const path=require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports ={
       entry: "./src/main.ts",
       output: {
           path: path.resolve(__dirname, './dist'),
           filename: "bundle.js",
       },
       resolve: {
           extensions: [".ts",".js",".cjs",".json"]
       },
       devServer: {
   
       },
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   loader: "ts-loader"
               }
           ]
       },
       plugins: [
           new HtmlWebpackPlugin({
               template: "index.html"
           })
       ],
       mode: "development"
   }
   
   ```

   

3. 使用

   ```shell
   tsc --init
   ```

   创建tsconfig.json文件

4. 如果感觉频繁刷新繁琐，可以使用webpack-dev-server并且使用webpack serve命令。

   ```json
   {
     "name": "test_webpack_ts",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack",
       "serve": "webpack serve"
     },
     "keywords": [
       "ts"
     ],
     "author": "masaikk",
     "license": "ISC",
     "devDependencies": {
       "ts-loader": "^9.2.6",
       "typescript": "^4.5.5",
       "webpack": "^5.68.0",
       "webpack-cli": "^4.9.2",
       "webpack-dev-server": "^4.7.4"
     }
   }
   ```

   文件的目录可以参考

   ![image-20220203174758188](ts.assets/image-20220203174758188.png)

   ---

   ### 类型的名称

   number/string对应的是typescript中的数字和字符串类型。

   String对应着JavaScript的字符串包装类。

   Number对应着JavaScript的数值包装类。

   **注意区分**

   ---

   ### unknown与any类型的区别

   unknown只能赋值给any类型和unknown类型。

   any类型可以赋值给任何类型。

   建议多使用unknown。

   ---

   ### never类型

   死循环或者因为抛出异常无法返回值的函数的类型。

   例如下列代码

   ```typescript
   function handleMessage(message: string | number) {
       switch (typeof message) {
           case "string": {
               // do something
               break;
           }
           case "number": {
               // do other thing
               break;
           }
           default: {
               const check: never = message;
           }
       }
   }
   ```

   类似与以上代码，如果使用了别的类型的参数，就会报错。

   ---

   ### tuple类型

   对于数组来说，不知道每个元素的类型。

   ```typescript
   /**
    * 新建一个数组
    */
   const arr: string[] = [];
   
   //新建一个元组
   const tup: [string, number, number] = ["abd", 12, 1.9]
   ```

   这里就可以确定每个元素的类型，防止因为某个元素不知道类型而缺失方法导致程序错误。

   结合泛型，类似于如下代码

   ```typescript
   function useState<T>(state: T) {
       let currentState = state;
       const changeState = (newState: T) => {
           //定义一个函数
           currentState = newState;
       }
   
       const tu: [T, (newState: T) => void] = [currentState, changeState];
       // 这里就使用元组比使用数组的好处在于知道类型
   
       return tu;
   }
   
   const [counter, setCounter] = useState(10);
   setCounter(1000);
   
   const [title, setTitle] = useState("abcd");
   
   const [flag, setFlag] = useState(true);
   ```

   
