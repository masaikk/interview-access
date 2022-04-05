# css学习

---

## flex布局

代码位于[masaikk/jss (gitee.com)](https://gitee.com/masaikk/jss)。学习视频[【黑马！真的很详细！】CSS3-flex布局(flex布局的单个知识点忘记也可以复习)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1N54y1i7dG)和[五分钟掌握 css3 flex弹性布局 超详细！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Lp4y1S7XM)

---

#### display

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

代码位于flex/basic/useflex.html

**当父盒子设置为flex布局之后，子元素的float,clear,vertical-align都会失效。**

flex的默认主轴是行，即属性``flex-direction: row;``默认存在。此时y轴就算是侧轴，元素沿着主轴排列。``flex-direction: row-reverse;``表示行内倒排，即如下：

![image-20220405123614393](css.assets/image-20220405123614393.png)

如果子元素在轴上显示不开，就会压缩子元素的大小，即``flex-wrap: nowrap;``。如果不想要，就设置``flex-wrap: wrap;``例如

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>useFlex</title>
    <style type="text/css">
        body{

        }

        #roo {
            background-color: #aaaaaa;
            height: 200px;
            border: red 2px dashed;
            display: flex;
            width: 80%;
            justify-content: space-between;
            /*flex-direction: row;*/
            /*flex-direction: row-reverse;*/
            flex-wrap: wrap;
        }

        .inn {
            margin: 5px;
            height: 100px;
            width: 250px;
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
        <span class="inn">4</span>
        <span class="inn">5</span>
        <span class="inn">6</span>

    </div>
</div>
</body>
</html>

```

![image-20220405134549607](css.assets/image-20220405134549607.png)



#### justify-content

**``justify-content``属性是设置主轴上的排布。**

设置为``justify-content: flex-end;``可以让元素靠右排列

![image-20220405125413003](css.assets/image-20220405125413003.png)

设置``justify-content: space-between;``表示两边贴边，中间平分。

![image-20220405133324828](css.assets/image-20220405133324828.png)

#### align-items

设置侧轴上的子元素排列方式 （单行情况）

![image-20220405135446007](css.assets/image-20220405135446007.png)

#### align-content

侧轴上子元素的排列方式（换行情况）

```css
flex-wrap: wrap;
align-content: flex-start;
```

![image-20220405140102184](css.assets/image-20220405140102184.png)

取消父节点的height属性并且修改``align-content: space-between;``显示为：

![image-20220405140320994](css.assets/image-20220405140320994.png)

align-content属性参考如下，注意此时只能在换行才有效，单行是无效的，都是以侧轴而言的。 单行的只能考虑align-item

![image-20220405140530086](css.assets/image-20220405140530086.png)

#### flex子元素属性

