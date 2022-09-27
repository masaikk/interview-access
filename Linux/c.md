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
SOCKET startServer(const char *ip, unsigned short port) {
    // create socket
    SOCKET fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (fd == INVALID_SOCKET) {
        printf("Create socket failed.\n");
        return INVALID_SOCKET;
    }

    SOCKADDR_IN serAddr;
    serAddr.sin_family = AF_INET;
    serAddr.sin_port = htons(port);
    serAddr.sin_addr.S_un.S_addr = inet_addr(ip);
    // bind IP & port
    int bindFlag = bind(fd, (const struct sockaddr *) &serAddr, sizeof(serAddr));
    if (SOCKET_ERROR == bindFlag) {
        printf("Bind failed. %d\n", WSAGetLastError());
        return INVALID_SOCKET;
    }

    listen(fd, 5);
    return fd;
}
```

在main函数中创建server，监听本地5668端口。

```c
SOCKET serfd = startServer("0.0.0.0", 5668);
```

接受客户端（在这里是浏览器）

```c
SOCKET clifd = accept(serfd, NULL, NULL);
```

循环向服务器发送bytes

```c
int main() {
    init_socket();
    SOCKET serfd = startServer("0.0.0.0", 80);
    printf("start successfully\n");
    while (true) {
        SOCKET clifd = accept(serfd, NULL, NULL);
        char buf[] = "<h1>Hello SOCKET</h1>";
        send(clifd, buf, strlen(buf), 0);
    }
    
    close_socket();
    printf("Hello, World!\n");
    return 0;
}

```

注意c语言没有bool，需要引入头文件`#include <stdbool.h>`

打开本地localhost:80

![image-20220921211749919](c.assets/image-20220921211749919.png)

这个循环的操作就相当于一直接电话（接通了之后就给客户端发送HTML的代码）。

同时，这里也能够接收客户端发来的代码，如下：

```c
void requestHanding(SOCKET fd) {
    char buf[BUFSIZ] = {0};
    if (0 >= recv(fd, buf, sizeof(buf), 0)) {
        // 如果接受客户端信息失败了
        printf("Receive failed. %d\n", WSAGetLastError());
        return;
    }
    // 如果成功接受客户端信息
    puts(buf);
}

int main() {
    init_socket();
    SOCKET serfd = startServer("0.0.0.0", 80);
    printf("start successfully\n");
    while (true) {
        SOCKET clifd = accept(serfd, NULL, NULL);
        char buf[] = "<h1>Hello SOCKET</h1>";
        send(clifd, buf, strlen(buf), 0);
        requestHanding(clifd);
    }

    close_socket();
    printf("Server closed!\n");
    return 0;
}
```

上面的`puts(buf);`打印如下信息：

![image-20220922125859231](c.assets/image-20220922125859231.png)

在上图中可以看到请求行等信息。

使用字符串操作来匹配method等信息，并且约定如果请求的url为/，就发送index.html

再进行一部分的字符串操作来拼接路径，还需要判断文件是否存在。

```c
struct _stat32 stat;
printf("%d================================", _stat32(url, &stat));
```

如果函数`_stat32()`第一个参数是路径读取成功，就返回0，否则返回-1。这个文件的信息保存在stat中。

创建两个文件index.html和404.html。

![image-20220925183948310](c.assets/image-20220925183948310.png)

需要注意的是，html的路径是相对于生成的二进制文件而言的。

并且，如果文件不存在的话，就返回404页面，代码类似于：

```c
void requestHanding(SOCKET fd) {
    char buf[BUFSIZ] = {0};
    if (0 >= recv(fd, buf, sizeof(buf), 0)) {
        // 如果接受客户端信息失败了
        printf("Receive failed. %d\n", WSAGetLastError());
        return;
    }
    // 如果成功接受客户端信息

    // 解析
    char method[10] = {0};
    char url[128] = {0};
    char urlBackup[128] = {0};
    int index = 0;
    char *p = NULL;
    for (p = buf; *p != ' '; p++) {
        method[index++] = *p;
    }
    p++;//跳过空格

    index = 0;
    for (; *p != ' '; p++) {
        url[index++] = *p;
    }
    strcpy(urlBackup, url);
    if (strcmp(method, "GET") == 0) {
        printf("GET requestHanding\n");
//        strcpy(url,rootPath);
//        strcat(url, (strcmp(url, "/") == 0 ? "/ index.html" : url));
        sprintf(url, "%s%s", rootPath, (strcmp(urlBackup, "/") == 0 ? "/index.html" : urlBackup));
        puts(url);
        // 判断文件是否存在
        struct _stat32 stat;
//        printf("%d================================", _stat32(url, &stat));
        if (-1 == _stat32(url, &stat)) {
            // 这里返回404
            char file[128] = {0};
            sprintf(file, "%s%s", rootPath, "/404.html");
            sendFile(fd, file);
        } else {
            sendFile(fd, url);
        }
    } else if (strcmp(method, "POST") == 0) {
        printf("POST requestHanding");
    }
}
```

之后就是补全读取和发送文件的函数`sendFile()`。

在这个函数中，选择是否读取到文件的结尾可以通过函数`feof()`来判断

```c
    char buf[BUFSIZ] = {0};
    if (!feof(file)) {
        int len = fread(buf, sizeof(buf), BUFSIZ, file);
        send(fd, buf, len, 0);
    }
```

最后，read并且发送文件的函数如下所示：

```c
void sendFile(SOCKET fd, const char *filename) {
    printf("Sending file: %s\n", filename);
    FILE *file = fopen(filename, "rb");

    if (!file) {
        perror("Failed to open file ");
        return;
    }
    char buf[BUFSIZ] = {0};
    while (!feof(file)) {
        int len = fread(buf, sizeof(char), BUFSIZ, file);
        send(fd, buf, len, 0);
    }
    fclose(file);
}
```

在浏览器运行http:localhost之后，可以得到index.html的页面

![image-20220925184118958](c.assets/image-20220925184118958.png)

输入错误的路由也可以展示404页面

![image-20220925185725712](c.assets/image-20220925185725712.png)

整体代码如下所示，之后可以考虑添加响应头信息等操作。

```c
#include <stdio.h>
#include <WinSock2.h>
#include <stdbool.h>
#include <sys/types.h>
#include <sys/stat.h>

#pragma comment(lib, "ws2_32.lib")

char rootPath[128] = "../testWeb";

void sendFile(SOCKET fd, const char *filename) {
    printf("Sending file: %s\n", filename);
    FILE *file = fopen(filename, "rb");

    if (!file) {
        perror("Failed to open file ");
        return;
    }
    char buf[BUFSIZ] = {0};
    while (!feof(file)) {
        int len = fread(buf, sizeof(char), BUFSIZ, file);
        send(fd, buf, len, 0);
    }
    fclose(file);
}

// open socket
void init_socket() {
    // 确定version socket
    WSADATA wsaData;
    int WSASCode = WSAStartup(MAKEWORD(2, 2), &wsaData);
//    printf("WSAStartup code : %d\n", WSASCode);
    if (WSAEINVAL == WSASCode) {
        printf("WSAStartup failed. %d\n", WSAGetLastError());
        exit(1);
    };
}

// close socket
void close_socket() {
    WSACleanup();
}

SOCKET startServer(const char *ip, unsigned short port) {
    // create socket
    SOCKET fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (fd == INVALID_SOCKET) {
        printf("Create socket failed.\n");
        return INVALID_SOCKET;
    }

    SOCKADDR_IN serAddr;
    serAddr.sin_family = AF_INET;
    serAddr.sin_port = htons(port);
    serAddr.sin_addr.S_un.S_addr = inet_addr(ip);
    // bind IP & port
    int bindFlag = bind(fd, (const struct sockaddr *) &serAddr, sizeof(serAddr));
    if (SOCKET_ERROR == bindFlag) {
        printf("Bind failed. %d\n", WSAGetLastError());
        return INVALID_SOCKET;
    }

    listen(fd, 5);
    return fd;
}

void requestHanding(SOCKET fd) {
    char buf[BUFSIZ] = {0};
    if (0 >= recv(fd, buf, sizeof(buf), 0)) {
        // 如果接受客户端信息失败了
        printf("Receive failed. %d\n", WSAGetLastError());
        return;
    }
    // 如果成功接受客户端信息

    // 解析
    char method[10] = {0};
    char url[128] = {0};
    char urlBackup[128] = {0};
    int index = 0;
    char *p = NULL;
    for (p = buf; *p != ' '; p++) {
        method[index++] = *p;
    }
    p++;//跳过空格

    index = 0;
    for (; *p != ' '; p++) {
        url[index++] = *p;
    }
    strcpy(urlBackup, url);
    if (strcmp(method, "GET") == 0) {
        printf("GET requestHanding\n");
//        strcpy(url,rootPath);
//        strcat(url, (strcmp(url, "/") == 0 ? "/ index.html" : url));
        sprintf(url, "%s%s", rootPath, (strcmp(urlBackup, "/") == 0 ? "/index.html" : urlBackup));
        puts(url);
        // 判断文件是否存在
        struct _stat32 stat;
//        printf("%d================================", _stat32(url, &stat));
        if (-1 == _stat32(url, &stat)) {
            // 这里返回404
            char file[128] = {0};
            sprintf(file, "%s%s", rootPath, "/404.html");
            sendFile(fd, file);
        } else {
            sendFile(fd, url);
        }
    } else if (strcmp(method, "POST") == 0) {
        printf("POST requestHanding");
    }
}


int main() {
    init_socket();
    SOCKET serfd = startServer("0.0.0.0", 80);
    printf("start successfully\n");
    while (true) {
        SOCKET clifd = accept(serfd, NULL, NULL);
        requestHanding(clifd);
    }
    close_socket();
    printf("Server closed!\n");
    return 0;
}

```

---

