---
lang: zh-CN
description: "AST 编译原理 JS编译器"
---

# 如何自己实现一个简单的tree shaking

tree shaking 简单理解就是在代码打包时将项目代码中没有用到的代码剔除掉，比如在一个文件中申明了一个工具函数，但是并没有调用它，把这样的代码剔除掉，以减少代码打包体积。

### acron
[acron](https://github.com/acornjs/acorn) A tiny, fast JavaScript parser, written completely in JavaScript。 是用js写的js语言的解析器。用它可以将js代码进行词法分析，语法分析，进而得到ast，处理ast得到我们想要的结果。
这里就用acron的能力，进行js的语法分析。

整体思路是，读取一个文件中的代码，调用acron进行语法分析，剔除没有调用过的函数，结果再输出到一个新的文件中。

```javascript
// test.js  源代码
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;   // 这个函数没有被调用，在shaking后，会剔除这个函数

const num1 = 9;
const num2 = 100;

const result = add(num1, num2);
```

整个项目的文件结构是：
```shell
project
   src
    |--- index.js   // 入口文件
    |--- test.js    // 源代码
    |--- visitor.js // 处理ast的代码
```

文件内容
```javascript
// index.js   // 入口文件
const fs = require('fs');
const acron = require('acorn');
const Visitor = require('./visitor');
const visitor = new Visitor();
// 获取命令行参数
const args = process.argv[2];
const buffer = fs.readFileSync(args).toString();
const body = acron.parse(buffer).body;

const decls = new Map(); // 记录所有申明过的变量
const calledDecls = []; // 记录调用过的函数
let code = []; // 存放源代码

body.forEach(node => {
    if (node.type === 'VariableDeclaration') {
        const kind = node.kind;
        for (const decl of node.declarations) {
            // todo
            decls.set(visitor.visitNode(decl.id), visitor.visitVariableDeclarator(decl, kind))
            if (decl.init.type === 'CallExpression') {
                calledDecls.push(visitor.visitIdentifier(decl.init.callee))
                const args = decl.init.arguments;
                for (const arg of args) {
                    if (arg.type === 'Identifier') {
                        calledDecls.push(visitor.visitNode(arg))
                    }
                }
            }
        }
    }
    if (node.type === 'Identifier') {
        calledDecls.push(node.name);
    }
    code.push(visitor.run([node]));
});

code = calledDecls.map(c => {
    return decls.get(c);
}).join('');

fs.writeFileSync(__dirname + '/test.shaked.js', code)

```

```javascript
// visitor.js  处理ast的代码
class Visitor {

    // 访问变量申明
    visitVariableDeclaration(node) {
        let str = '';
        str += node.kind + ' ';
        str += this.visitNodes(node.declarations);
        return str + '\n';
    }
    
    // 访问定义的变量名
    visitVariableDeclarator(node, kind) {
        let str = '';
        str += kind ? kind + ' ' : str;
        str += this.visitNode(node.id) + ' ';
        str += '= ';
        str += this.visitNode(node.init);
        return str + ';' + '\n';
    }
    // 访问标识符
    visitIdentifier(node) {
        let str = '';
        str += node.name;
        return str;
    }

    // 访问箭头函数
    visitArrowFunctionExpression(node) {
        let str = '';
        str += '(';
        node.params.forEach((param, index) => {
            str += this.visitNode(param);
            str += (index === node.params.length - 1) ? '' : ','
        })
        str += ')';
        str += '=>';
        str += this.visitNode(node.body);
        return str + '\n';
    }
    // 访问字符常量
    visitLiteral(node) {
        let str = '';
        str += node.raw;
        return str;
    }
    // 访问操作符
    visitBinaryExpression(node) {
        let str = '';
        str += this.visitNode(node.left);
        str += node.operator;
        str += this.visitNode(node.right);
        return str + '\n';
    }

    visitCallExpression(node) {
        let str = '';
        str += this.visitNode(node.callee);
        str += '(';
        node.arguments.forEach((param, index) => {
            str += this.visitNode(param);
            str += (index === node.arguments.length - 1) ? '':',';
        })
        str += ')';
        return str;
    }

    visitNodes(nodes) {
        let str = ''
        nodes.forEach(node => {
            str += this.visitNode(node);
        });
        return str;
    }

    visitNode(node) {
        let str = '';
        switch (node.type) {
            case 'VariableDeclaration':
                str += this.visitVariableDeclaration(node);
                break;
            case 'VariableDeclarator':
                str += this.visitVariableDeclarator(node);
                break;
            case 'Identifier':
                str += this.visitIdentifier(node);
                break;
            case 'ArrowFunctionExpression':
                str += this.visitArrowFunctionExpression(node);
                break;
            case 'BinaryExpression':
                str += this.visitBinaryExpression(node);
                break;
            case 'Literal':
                str += this.visitLiteral(node);
                break;
            case 'CallExpression':
                str += this.visitCallExpression(node);
                break;
            default:
                break;
        }
        return str;
    }

    run(body) {
        let str = '';
        // 遍历
        str += this.visitNodes(body);
        return str;
    }
}

module.exports = Visitor;
```

在命令行中执行
```shell
node src/index.js src/test.js
```

得到test.shaked.js 文件
```javascript
const add = (a,b)=>a+b

;
const num1 = 9;
const num2 = 100;

```

至此，一个简单的tree shaking就做完了。
