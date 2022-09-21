# C++

同样是为了WASM做准备，在这里记录还能复习Linux知识。

---

## 编写服务器

参考链接[【C/C++项目开发实施】：纯C语言编写Web前端，两百行代码带你编写Web服务器！！！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1rr4y1g7b1/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=36542d6c49bf487d8a18d22be404b8d2)

---

值得注意的是，在这里，windows平台上是`#include <WinSock2.h>`。

主体框架如下:

```c
#include <stdio.h>
#include <WinSock2.h>

#pragma comment(lib, "ws2_32.lib")

//open socket
void init_socket() {
    //确定version socket

}

//close socket
void close_socket() {

}

SOCKET startServer(const char *ip, unsigned short port) {
    return 0;
}

int main() {
    init_socket();
    close_socket();
    SOCKET serfd = startServer("0.0.0.0", 80);
    printf("Hello, World!\n");
    return 0;
}

```

在`init_socket()`函数中，首先应该确定socket的版本号，使用函数`WSAStartup()`，这里是要两个字节的参数，所以使用c的`MAKEWORD()`函数拼接两个字节，在这里是2,2。

```c
void init_socket() {
    //确定version socket
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2,2), &wsaData);
}
```

并且使用宏`WSAEINVAL`判断这个函数的返回值是否是失败。

```c
    if (WSAEINVAL == WSAStartup(MAKEWORD(2, 2), &wsaData)) {
        printf("WSAStartup . %d\n", WSAGetLastError());
        exit(1);
    };
```

关闭服务器

```c
void close_socket() {
    WSACleanup();
}
```

在运行一个服务器的时候，先初始化一个socket，使用了TCP的协议。并且加上错误的代码。

```c
SOCKET startServer(const char *ip, unsigned short port) {
    //create socket
    SOCKET fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (fd == INVALID_SOCKET) {
        printf("create socket failed\n");
        return INVALID_SOCKET;
    }
    return 0;
}
```

然后就需要绑定ip和port，查看`bind()`这里需要声明一个结构体`SOCKADDR_IN serAddr;`。

在这里需要注意小端大端的区别。在电脑上使用的是小端，在网络传输上使用的是大端。所以在这里需要转换大端再绑定端口`serAddr.sin_port = htons(port);`

```c
```





