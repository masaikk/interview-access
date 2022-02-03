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
           extensions: [".ts",'.js']
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

   
