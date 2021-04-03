## Docker + Nginx 实践 (mac 版)

本篇文章的主要内容就是在 docker 中跑 nginx

环境： Mac + docker

### 镜像安装+运行

首先下载 nginx 镜像

[Nginx](https://hub.docker.com/_/nginx)，我这里 下载的是 nginx 1.19 版本的，通常不下 latest 标签版本的，因为还没有稳定。

下载命令

```bash
docker pull nginx:1.19
```

查看本地的镜像

```sh
docker images
```

首次运行 nginx 镜像，使用 docker run 命令创建一个 nginx 容器，-p 参数是把 nginx 的默认端口号映射到本机的 9091 端口，这样就可以在本机的 localhost:9092 访问到 nginx 页面了， -d 表示在后台运行，最后加上镜像的名称+标签号，或者使用镜像 ID 也可以

```shell
docker run -p 9092:80 -d nginx:1.19
```

成功执行后，访问http://localhost:9092/ 应该就可以看到 nginx 的欢迎页面

![image-20200608090716580](../images/docker-nginx1.png)

### 从 docker 容器中拷贝文件到本机

在容器和本机之间能进行文件的交流应该是基本需求，docker 也提供了这样的命令，就是 docker cp

比如我们想把容器中 nginx 的配置文件拷贝到本机中的某一个路径中，可以这样写

首先查看运行的 nginx 容器的 ID， docker ps 命令的作用是列出所有正在运行的容器，如果要列出包含已停止、已退出的容器，再在后面加上-a。

```shell
docker ps
```

![image-20200608092241011](../images/docker-nginx2.png)

运行 docker cp 命令 container:path 本地 path

```shell
docker cp a86e916389e3:/etc/nginx/nginx.conf ~/Desktop/demos
```

这样我们在本地在本地就拷贝了一份 nginx 配置文件。

### 将本地文件夹挂载到容器内部文件夹

将本地文件夹或者文件挂载到容器内部，方便我们随时调试，因为我们修改了本地文件，重启容器，容器就能读取到更新的内容。可以想象成容器内部文件夹有一个指针，指向了我们本地的文件夹，所以我们本地的变化，容器内部也能同步更新。使用-v 参数进行文件夹的挂载，前面的是本地的路径，后面的是容器内部的路径。

```shell
## 映射容器目录
docker run -d -p 9091:80 --name nginx -v ~/Desktop/demos/server/nginx/www:/usr/share/nginx/html -v ~/Desktop/demos/server/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/Desktop/demos/server/nginx/log:/var/log/nginx nginx:1.19
```

再在~/Desktop/demos/server/nginx/www 文件夹下创建一个 index.html 文件，浏览器访问 localhost:9091 就能看到 index.html 的内容了。

接下来可以尝试更改 nginx 的配置，实验各种配置参数，进一步了解 nginx。
