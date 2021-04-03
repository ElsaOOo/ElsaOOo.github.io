---
lang: zh-CN
description: "webpack webpack 自定义loader"
---



# Webpack custom loader



*_文章引用请注明出处_*

本文讲一下怎么制作自己的webpack 自定义loader。

webpack  loader的作用是进行模块资源的转换，webpack打包只认识js，这个时候项目里使用到的图片资源、样式资源等就需要用loader来进行转换，转换成js，然后webpack再进行打包。



那loader是怎样进行转换的呢，每种loader就是一个js文件，它接收到webpack传给它的“上下文”， 这个“上下文”就是项目源代码，loader拿到源代码，其实是一系列字符串，就可以进行操作转换了。



下面看一个demo：

比如我们有这样一个需求，就是在我们所有的打包文件中都加上 “ 公司名@年份” 这个注释句子。

首先我们可以在webpack.config.js的同级目录下创建一个目录叫做`custom-loaders` ，然后在这个目录下创建一个自定义loader文件`add-copyright-loader.js`

```javascript
// `add-copyright-loader.js`
module.exports = function (content) {
  return `/** alibaba@2020 */\n${content}`;
};
```

loader文件是一个node模块， 以commonJs的方式导出一个函数，这个函数接收的参数有三个，content, map, meta，map和meta是可以省略的，其中content能拿到webpack处理源文件时每个文件对应的代码，它是string或者buffer（buffer可以转换成string），我们拿到这个字符串就能对源代码进行修改了，转换成我们需要的样子再返回回去。

在webpack.config.js中把我们的自定义loader加进来：

```javascript
// ... 
module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: path.resolve(
              __dirname,
              "./custom-loaders/add-copyright-loader.js"
            ),
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
```

然后执行`npm run build`，我们就可以在打包文件中看到：

```javascript
// dist/index.js 这个是webpack config mode 设置为'none'时打包的结果
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/** alibaba@2020 */

console.log("test");


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/** alibaba@2020 */
const add = (a, b) => a + b;


/***/ })
/******/ ]);
```



总结：webpack loader 其实就是对资源文件的转换，从上一个laoder拿到结果，转换后再返回给下一个loader，所以在配置文件中要注意loader的顺序。

