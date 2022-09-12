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