# Linux基础知识

在这里记录知识，虽然除了自己没人看。

## Linux基本命令

`fg`

对于一段已经使用ctrl+z在后台运行的任务来说，可以使用这条命令将它挂到前台。

`last`

可以通过这个命令查看历史登陆记录。

`nmap`

扫描端口是否开启。

---

## 基本流程

### ssh免密登录

参考[https://blog.csdn.net/jeikerxiao/article/details/84105529](https://blog.csdn.net/jeikerxiao/article/details/84105529)

首先需要在本机生成自己的ssh公钥和私钥。

```shell
ssh-keygen
```

查看文件`cd ~/.ssh`再`ls`

下创建两个密钥：

1. id_rsa （私钥）
2. id_rsa.pub (公钥)

最后上传到服务器

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub 用户@ip
```

即可以在服务器端的~/.ssh/authorized_keys看到，此时已经可以登录。

---

