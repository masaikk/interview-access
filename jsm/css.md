# css学习

代码位于[masaikk/jss (gitee.com)](https://gitee.com/masaikk/jss)。学习视频[【黑马！真的很详细！】CSS3-flex布局(flex布局的单个知识点忘记也可以复习)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1N54y1i7dG)和[五分钟掌握 css3 flex弹性布局 超详细！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Lp4y1S7XM)

---

## flex布局

将根组件加上``display: flex;``可以将该节点变为flex盒子。

基本的flex如下所示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>useFlex</title>
    <style type="text/css">
        #roo {
            background-color: #aaaaaa;
            height: 200px;
            border: red 2px dashed;
            display: flex;
            width: 80%
        }

        .inn {
            margin: 5px;
            height: 100px;
            width: 150px;
            background-color: #007fff;
            text-align: center;
        }
    </style>
</head>
<body>
<div>
    <div id="roo">
        <span class="inn">1</span>
        <span class="inn">2</span>
        <span class="inn">3</span>
    </div>
</div>
</body>
</html>
```

展示的界面如下

![image-20220405001056596](css.assets/image-20220405001056596.png)

如果要让这三块依次排布，则可以在根节点上加入``justify-content: space-around;``便可以得到如下效果：

![image-20220405001406493](css.assets/image-20220405001406493.png)

当父盒子设置为flex布局之后，子元素的float,clear,vertical-align都会失效。

