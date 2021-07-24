---
description: "面试题之 script标签中async和defer属性的区别"
---

# 面试题之 script 标签中 async 和 defer 属性的区别

最近在做网页性能优化方面的东西，用 chrome devTools 的性能检测工具 lighthouse 跑了一遍后，发现其中有一项是**Efficiently load third-party JavaScript**，就是我们在项目中用 script 标签引用的第三方库。

首先我们应该把这个 script 标签写在 body 里面，这样浏览器在加载 html 文档的时候就不会去解析 js，这样会阻止 html 的渲染。

怎么优化加载第三方脚本？

其中一种方式就是在 script 标签上加上`async` 或者 `defer`属性。

像这样：

```javascript
<script async src="script.js">

<script defer src="script.js">
```

### async

async 属性的执行是在脚本下载完之后，在 window 的 load 事件发生之前。如果这个时候文档还没有解析完全意味着它们可以阻止 DOM 构建。

![script-async](../images/script-async.png)

### defer

defer 属性的执行是在文档完全解析完成后进行的，在 window 的 DOMContentLoaded 事件之前。defer 属性就可以保证它们执行是按照它们出现在 HTML 中的顺序来的，并且不会阻止主线程的渲染。

![script-defer](../images/script-defer.png)

- 如果这个脚本在加载早期要执行就可以用`async`
- 如果这个脚本没那么重要就可以使用`defer`
