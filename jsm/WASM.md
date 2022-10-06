# WASM

记录WebAssembly的学习笔记。**下定决心，不怕牺牲，排除万难，去争取胜利。**

## rust基础

### 语法知识1

贴一个简单的小程序，用于猜数字。

```rust
use std::io;

fn main() {
    println!("guess the number");
    let mut guess = String::new();
    io::stdin().read_line(&mut guess).expect("error");
    println!("{}", guess)
}
```

在这个语言中，`println!`是宏的意思，因为有`!`。

在rust中，变量默认是不可变的，是immutable的，需要使用mut关键字来修饰才可变。如上面的`let mut guess = String::new();`。

`String::new()`这里表示String类型的关联函数`new()`。`pub const fn new() -> String`

`read_line(&mut guess)`中的&表示参数是一个引用。前面加上mut也是表示这个是可变的变量。

对于rust生成随机数，可以在cargo.toml中添加依赖，如下所示

```toml
[package]
name = "cargotest2"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
rand = "^0.3.14"
```

再使用`cargo build`命令可以下载所需要的包。

```rust
use std::io;
use rand::Rng;

fn main() {
    let some_intergater:u32 = rand::thread_rng().gen_range(1..101);
    let mut guess:String=String::new();
    io::stdin().read_line(&mut guess).expect("msg");
    println!("{}--{}",some_intergater,guess)
}

```

值得注意的是，rust推荐是下划线命名法。

对于生成随机数的`gen_range()`来说，它需要一个`R: SampleRange<T>`参数，所以说是`1..101`，这里是左闭右开的。

在使用比较大小的操作中，不使用大于号或者小于号的操作，而是使用match操作，对于match中的分支，被称为arm。

使用`let guess:u32=guess.trim().parse().expect("");`语句先来去除前后空格，之后的`parse()`表示解析类型，所以前面必须要显式指定类型。并且使用expect方法是用于处理parse()方法中枚举错误的操作。示例代码如下：

```rust
    let guess:u32=guess.trim().parse().expect("");

    match guess.cmp(&some_intergater){
        Ordering::Less=>{
            println!("too small")
        },
        Ordering::Greater=>println!("too big"),
        Ordering::Equal=>println!("Is it.")

    }
```

类似于别的语言的`while(true)`，rust中提供了loop关键字，它也可以通过break退出循环。

```rust
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    let some_intergater = rand::thread_rng().gen_range(1..101);
    println!("end {}",some_intergater);
    loop {
        println!("猜测一个数字");
        let mut guess: String = String::new();
        io::stdin().read_line(&mut guess).expect("error");
        let guess: u32 = guess.trim().parse().expect("error");

        match guess.cmp(&some_intergater) {
            Ordering::Less => {
                println!("too small.")
            }
            Ordering::Greater => println!("too big."),
            Ordering::Equal => {
                println!("Is it.");
                break;
            }
        }
    }
}
```

**请注意`print!()`和`println!()`的区别。现在使用的是`println!()`。**

对于复合类型，rust提供了元组和数组两种方式，可以类似于JavaScript的解析变量，同时，对于元组，也可以下标取值。

```javascript
let t:(i32,f64,u8)=(123,5.6,3);
let (a,b,c)=t;
```

![image-20220918193235822](WASM.assets/image-20220918193235822.png)

并且，编译器会自动推导类型。

对于数组来说，每个类型都是相同的。

其中，`let a=[3;5]`与`let a=[3,3,3,3,3]`等价。

在rust中，函数的名字需要显式标出参数类型和返回值类型，例如

```rust
fn add(a:usize, b:usize) -> usize {
    return a+b;
}
```

### rust的所有权$\bigstar$

rust的所有权使得rust无需GC，也能保证内存安全，是一个很重要的特性。

![image-20220930175117373](WASM.assets/image-20220930175117373.png)

![image-20221001225101173](WASM.assets/image-20221001225101173.png)

区分栈内存和堆内存，栈内存是固定大小的，堆内存不固定大小。

把数据压到栈内存中会比分配到堆内存中快得多，对于栈内存来说，不能叫做“分配”。

并且，由于指针的大小是固定的，所以会被压到栈内存中。

![image-20221001225653767](WASM.assets/image-20221001225653767.png)

对于String分配的内存需要注意以下两点：

1. rust中的字符串字面值表示的是在代码中已经写定的字符串。
2. 为了保存类似于用户输入的这种可变的字符串，rust创建了第二种，即String类型。

所以String类型是保存在堆内存中。而字符串字面量是直接硬编码在内存中以保证了使用的高效。

并且类似于上文猜数字的代码中，可以通过字符串字面量来创建String，例如`let mut s = String::from("123");`

![image-20221001234254512](WASM.assets/image-20221001234254512.png)

而在拷贝复杂数据的时候，参考JavaScript的浅拷贝，数据结构是这样的，这里以String为例，变量指针放在stack里面，数据存放在heap里面：

![image-20221001234503531](WASM.assets/image-20221001234503531.png)

而一个变量离开作用域的时候，会删除heap数据，因为有两个变量，很有可能导致多次释放变量的错误，所以在Rust里面的做法是在语句`let s2=s1`中，废弃掉s1。不同于其他语言的浅拷贝或者是深拷贝，rust中的这个操作，可以叫做“移动”。如果想要类似于其他语言的深拷贝，在rust里面叫做“克隆”。

```rust
fn main() {
    let s1 = String::from("hello world");
    let s2 = s1.clone();
    println!("{}", s1);
    println!("{}", s2);
}
```

对于一个函数来说：

+ 把一个值赋值给其他变量的时候就会发生移动
+ 当一个包含heap数据的变量离开作用域的时候，它的值就会被drop函数清理掉，除非数据的所有权移动到另一个函数变量上面了。

---

## rust构建WASM

可以参考[WebAssembly 与 Rust 编程系列05 Rust编写wasm模块_austindev的博客-CSDN博客_rust wasm](https://blog.csdn.net/austindev/article/details/107093013#:~:text=我们需要把rust代码编译成wasm目标模块%2C必须安装 rust WebAssembly 对应的target,我们可以通过 rustup 的target命令%2C 了解可用的target 以及是否安装)

首先初始化项目

```shell
cargo new --lib hello-wasm
```

注意这里要``--lib``

然后可以在lib.rs中输入示例代码

```rust
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str){
    alert(&format!("hello {} !",name));
}
```

其次，在cargo.toml中引入依赖

```toml
[package]
name = "hello-wasm"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

```

然后需要安装在编译的依赖，根据以上引用的文章，安装 `wasm32-unknown-unknown`

```shell
rustup target add wasm32-unknown-unknown
```

之后使用`cargo build --release --target wasm32-unknown-unknown`可以进行编译，在target下面可以找到wasm文件。

参考[博客](https://blog.csdn.net/weixin_47723549/article/details/126161165)

在clion中创建一个rust的lib项目，在这里可以看到src下是lib.rs

![image-20221006111701313](WASM.assets/image-20221006111701313.png)

在Cargo.toml中写依赖：

```toml
[package]
name = "rustlibDemo1"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.78"
base64 = "0.13.0"

[package.metadata.wasm-pack.profile.release]
wasm-opt = false

```

在lib.rs里面写示例代码，定义两个函数，这里的函数名之后在js中也能用到

```rust
use wasm_bindgen::prelude::*;
use base64::decode;

//解析base64
#[wasm_bindgen]
pub fn my_str(s:String) -> String{
    let s = base64::decode(s).unwrap();
    return String::from_utf8(s.clone()).unwrap();
}
//计算两个数相加
#[wasm_bindgen]
pub fn add(a:i32, b:i32) -> i32{
    return a+b;
}
```

配置build，主要是设置target为web

![image-20221006111939843](WASM.assets/image-20221006111939843.png)

按照clion的提示安装相关依赖，使用clion进行build操作之后，可以看到这里有文件在pkg里面。

![image-20221006112307192](WASM.assets/image-20221006112307192.png)

创建一个html文件，导入js文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="module">
        import init, {add, my_str} from "./pkg/rustlibDemo1.js";

        init().then(() => {
            console.log(add(1, 2))
            console.log(my_str("6ams6LWb5p+v5p+v"))
        });
    </script>
</head>
<body>

</body>
</html>
```

可以成功运行，在控制台中打出如下信息：

![image-20221006113043517](WASM.assets/image-20221006113043517.png)



对于vue3项目来说，可以考虑在onMounted阶段导入init函数，然后异步await。

示例代码如下

```vue
<template>
  <div>
    <h1>
      {{ msg }}
    </h1>
    <button @click="clickHandler">click</button>
  </div>
</template>

<script lang="ts">
import {onBeforeMount, Ref, ref} from "vue";
import init, {my_str, add} from "./pkg";
import {onMounted} from "vue";

export default {
  name: "WasmComp1",

  setup() {
    let msg: Ref<string> = ref('initial');
    onBeforeMount(async () => {
      await init();
    })
    const clickHandler = () => {
      alert(my_str('6ams6LWb5p+v5p+v'))
    }
    onMounted(() => {
      console.log(add(114, 514))
    })

    return {
      msg,
      clickHandler
    }
  }

}
</script>
```

绑定了按钮点击事件，能正常展示：

![image-20221006143736237](WASM.assets/image-20221006143736237.png)

---

