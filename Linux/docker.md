# Docker笔记

主要是看书

---

## Dockerfile

使用``#``进行注释

---

## 常用容器

+ MySQL
  + ``docker run -p 3306:3306  -e MYSQL_ROOT_PASSWORD=123 -d mysql``
+ MongoDB
  + [官网](https://hub.docker.com/_/mongo)
  + ``docker run -d mongo``
  + 使用如下命令``docker exec -it ${ID} sh``

---

## 常用指令

