---
lang: zh-CN
description: "js 数组扁平化的几种方式"
---

# JS 数组扁平化的几种方式

在日常开发工作中，将一个多维数组扁平化为一维数组是常见的需求，这里总结一下js中数组扁平化的几种方式。



### 递归实现

通过递归的方式，一项一项的去遍历，如果每一项还是一个数组，就继续往下去遍历，直到单个元素不是一个数组，

```javascript
const nestArr = [1, [2], [[3], [4]], [[[5], [6]]]];

function flattenArray(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            result = result.concat(flattenArray(array[i]));
        } else {
            result.push(array[i]);
        }
        
    }
    return result;
}

console.log(flattenArray(nestArr))  // => [ 1, 2, 3, 4, 5, 6 ]
```



### js reduce方法

reduce方法其实也是一种递归方法，比上面的for循环简洁一点。

```javascript
const nestArr = [1, [2], [[3], [4]], [[[5], [6]]]];
function flattenArray(array) {
    return array.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flattenArray(cur) : cur);
    }, [])
}

console.log(flattenArray(nestArr)) // => [ 1, 2, 3, 4, 5, 6 ]
```



### js 扩展运算符实现

```javascript
const nestArr = [1, [2], [[3], [4]], [[[5], [6]]]];
function flattenArray(array) {
    while (array.some((item) => Array.isArray(item))) {
      // 每次展开一项
        array = [].concat(...array)        
    }
    return array;
}

console.log(flattenArray(nestArr)) // => [ 1, 2, 3, 4, 5, 6 ]
```



### js 数组的flat方法

ES6中的flat方法，可以直接实现数组的扁平化

```javascript
arr.flat([depth]) // 具体参考mdn文档
```



### toString + split方法

```javascript
const nestArr = [1, [2], [[3], [4]], [[[5], [6]]]];
function flattenArray(array) {
    return array.toString().split(',') // 这里的toString()方法将数组中的每一项转化为字符串类型
}
console.log(flattenArray(nestArr)) // => [ '1', '2', '3', '4', '5', '6' ]
```



### 正则 + JSON方法处理

```javascript
const nestArr = [1, [2], [[3], [4]], [[[5], [6]]]];
function flattenArray(array) {
    let str = JSON.stringify(array);
    str = str.replace(/(\[|\])/g, '');
    str = `[${str}]`;
    return JSON.parse(str);
}

console.log(flattenArray(nestArr)) // => [ 1, 2, 3, 4, 5, 6 ]
```

