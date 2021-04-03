---
description: "日常开发中遇到问题集合"
---

## 怎样查看全局安装的 npm 包的位置

使用命令`npm root` 可以告诉你 npm 包的安装位置。
`npm root -g` 则会告诉你全局安装的 npm 包的位置。  
**Example:**

```sh
npm root -g
/usr/local/lib/node_modules
```

