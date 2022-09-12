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

