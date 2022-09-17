# WASM

记录WebAssembly的学习笔记。**下定决心，不怕牺牲，排除万难，去争取胜利。**

## rust基础

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

