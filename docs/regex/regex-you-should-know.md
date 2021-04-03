---
lang: zh-CN
description: "js 正则, js 正则基础"
---

# 你应该知道的一些正则知识

本文翻译自[shreyasminocha 的 github](https://github.com/shreyasminocha/regex-for-regular-folk)

这是一本关于正则表达式的“实验性”的小书。和我通常阅读到的一些正则资料不同的是，在这本小书中有大量的可视化的正则表达式以及正则示例。
我也试图选择一些测试案例来显示一些常见的错误 ❎。我认为你花一点时间来阅读这本小书是非常值得的。

这本小书面向正则的入门者，你需要一些编程的经验。书中不会涉及高级的正则概念像正则表达式回溯法原理及递归匹配这些--至少目前不会。

这本小书也是一个[开源项目](https://github.com/shreyasminocha/regex-for-regular-folk)，欢迎你提出 issue 和建议。

## 简介

正则表达式('regexes')是定义一个模式然后对字符串进行扫描，子字符串有匹配到的通常称为‘匹配组’。

> 一个正则表达式就是定义一个搜索规则的一串字符集合

正则通常用来:

- 对输入进行校验
- 查找-替换操作
- 高级字符串操作
- 文件查找或者重命名
- 设置白名单或者黑名单
- ...

但是，正则对这些问题是不太合适的:

- 解析 XML 或 HTML
- 精确匹配日期
- ...

现在的正则引擎都有自己的一些特点。这本小书会避免研究这些正则引擎的特征部分，把重点放在他们的共有特性上。  
以下这些示例代码片段都是用的 JavaScript，所以这本书也比较倾向于 JS 的正则引擎。

## 基础

正则表达式的书写规则形如/\<rules>/\<flags>。  
我们先来看看正则表达式/p/g。记得写上 g 标志符。  
`/p/g` [[RegExr]](https://regexr.com/?expression=%2Fp%2Fgm&text=pancake%0Apineapple%0Aapple%0Amango%0APlum) [[Visual]](https://regexper.com/#%2Fp%2Fg)

```javascript
"pancake".match(/p/g);
// ["p"]

"mango".match(/p/g);
// null
```

`/p/g`匹配到了字符串中所有的 p。

::: tip 提醒
正则表达式是大小写区分的
:::

`/pp/g`

```javascript
"apple".match(/pp/g);
// ["pp"];

"papaya".match(/pp/g);
// null
```

## 字符集合

可以用一个字符集合去匹配某个字符
`/[aeiou]/g` [[Visual]](https://regexper.com/#%2F%5Baeiou%5D%2Fg)

```js
"avocado".match(/[aeiou]/g);
//  ["a", "o", "a", "o"]

"rhythm".match(/[aeiou]/g);
// null
```

`/p[aeiou]t/g` [[Visual]](https://regexper.com/#%2Fp%5Baeiou%5Dt%2Fg)  
这个正则规则是匹配 p 然后接着是 aeiou 其中一个字符然后接着是 t。

```js
"pat".match(/p[aeiou]t/g);
//  ["pat"]

"pit".match(/p[aeiou]t/g);
// ["pit"]

"bat".match(/p[aeiou]t/g);
// null
```

26 个字母是有顺序的，连续的。用-来表示一段连续的字母。
`/[a-z]/g` [[Visual]](https://regexper.com/#%2F%5Ba-z%5D%2Fg)

```js
"john_s".match(/[a-z]/g);
//   ["j", "o", "h", "n", "s"]

"4952".match(/[a-z]/g);
// null

"LOUD".match(/[a-z]/g);
//  null
```

::: warning 警告
`/[a-z]/g`这个正则只匹配一个字符。在上面的示例中，一个字符串中有多处匹配到的地方，每处匹配到的地方只有一个字符。而不是一个字符串只匹配一个字符。
:::

我们也可以把单个字符和连续字符结合起来表示，`/[a-zA-Z0-9_-]/g` [[Visual]](https://regexper.com/#%2F%5BA-Za-z0-9_-%5D%2Fg)

```js
"john_s".match(/[A-Za-z0-9_-]/g);
//   ["j", "o", "h", "n", "_", "s"]

"Ayesha?!".match(/[A-Za-z0-9_-]/g);
//   ["A", "y", "e", "s", "h", "a"]
```

在正则中用^来表示一个集合的非。`/[^aeiou]/g` [[Visual]](https://regexper.com/#%2F%5B%5Eaeiou%5D%2Fg)
这个正则表示匹配除了 aeiou 的其他字符。

```js
"Umbrella".match(/[^aeiou]/g);
//  ["U", "m", "b", "r", "l", "l"]

"ou".match(/[^aeiou]/g);
// null
```

`/[^aeiou]/g` 和 `/[aeiou]/g` 的区别是在[的后面紧跟了一个^符号。它的作用是取它后面字符集合的非集。

### 示例

`/[^a-zA-Z_0-9-]/g` [[Visual]](https://regexper.com/#%2F%5B%5Ea-zA-Z_0-9-%5D%2Fg)

```js
"TheLegend27".match(/[^a-zA-Z_0-9-]/g);
// null

"Robert'); DROP TABLE Students;--".match(/[^a-zA-Z_0-9-]/g);
//  ["'", ")", ";", " ", " ", " ", ";"];
```

我们也可以指定连续字符的范围，不总是 a-z
`/[A-HJ-NP-Za-kmnp-z2-9]/g` [[Visual]](https://regexper.com/#%2F%5BA-HJ-NP-Za-kmnp-z2-9%5D%2Fg)

```js
"foo".match(/[A-HJ-NP-Za-kmnp-z2-9]/g);
//  ["f"]

"lI0O1".match(/[A-HJ-NP-Za-kmnp-z2-9]/g);
// null
```

## 转义字符集

Character Escapes, 不知翻译得对不对...
转义字符集就是一些常用的公用的字符集合的简写

### 数字转义字符 --- \d

\d 匹配所有的数字，0 - 9，它和[0-9]这个字符集的作用是相同的。

`/\d/g` [[Visual]](https://regexper.com/#%2F%5Cd%2Fg)

```js
"2020".match(/\d/g);
//  ["2", "0", "2", "0"]

"It costs $5.45".match(/\d/g);
//  ["5", "4", "5"]
```

`/\d\d/g` [[Visual]](https://regexper.com/#%2F%5Cd%5Cd%2Fg)

```js
"2020".match(/\d\d/g);
//  ["20", "20"]

"3.14159".match(/\d\d/g);
//  ["14", "15"]
```

::: tip 提醒
虽然 59 也是一对数字，大多数正则引擎是从左往右扫描找到不重叠的匹配。
:::

`/\D/g` [[Visual]](https://regexper.com/#%2F%5CD%2Fg) \D 是\d 的非集，和[^0-9]表现的效果相同，是匹配除了数字以外的字符。

```js
"2020".match(/\D/g);
// null

"It costs $5.45".match(/\D/g);
//  ["I", "t", " ", "c", "o", "s", "t", "s", " ", "$", "."]
```

### 单词转义字符 --- \w

`\w` [[Visual]](https://regexper.com/#%2F%5Cw%2Fg) 匹配那些认为是‘单词字符’的字符。这些包括：

- 小写字母： a-z
- 大写字母： A-Z
- 数字： 0-9
- 下划线： \_

所以它的效果和[a-zA-Z0-9_]是一样的。

```js
"Ayesha?!".match(/\w/g);
//  ["A", "y", "e", "s", "h", "a"]

"21*2 = 42(1)".match(/\w/g);
//  ["2", "1", "2", "4", "2", "1"]
```

\W 则是 \w 的非集，跟[^a-za-z0-9_]的效果是一样的。

### 空格字符集 --- \s

`\s` 匹配空格。根据正则引擎的不同，匹配到的情况可能不一样，但是大多包含以下几种：

- 空格
- tab 键 \t
- 回车键 \r
- 换行符 \n
- 换页符 \f

有些还包括垂直 tab 键(\v)。支持 unicode 的正则引擎通常会包括这些情况。  
`/\s/g` [[Visual]](https://regexper.com/#%2F%5Cs%2Fg)

```js
"word word".match(/\s/g);
//  [" "]

"tabs vs spaces".match(/\s/g);
//  [" ", " "]
```

**\S 则是 \s 的非集。**

### 任意字符 --- .

. 会匹配任意字符
`/./g` [[Visual]](https://regexper.com/#%2F.%2Fg)

```js
"john_s".match(/./g);
//  ["j", "o", "h", "n", "_", "s"]

"21*2 = 42(1);-;".match(/./g);
//  ["2", "1", "*", "2", " ", "=", " ", "4", "2", "(", "1", ")", ";", "-", ";"]
```

### 需要转义的字符

以下这些字符在正则表达式中通常有特殊的含义，在需要匹配它们的时候要转义

- |
- {}
- ()
- []
- ^ \$
- - - ?
- \
- . (这个符号表示匹配任意字符，在字符集合里如果表示要匹配. 则不需要转义)
- \- (- 这个符号在字符集合中出现的时候，可能会表示范围)

当我们想要匹配这些特殊字符的时候，就需要转义啦，就是**在这些字符前面加上\\**

`/\(paren\)/g` [[Visual]](<https://regexper.com/#%2F%5C(paren%5C)%2Fg>)

```js
"paren".match(/\(paren\)/g);
// null

"a (paren)".match(/\(paren\)/g);
//  ["(paren)"]
```

`/(paren)/g` [[Visual]](<https://regexper.com/#%2F(paren)%2Fg>)

```js
"paren".match(/(paren)/g);
//  ["paren"]

"(paren)".match(/(paren)/g);
//  ["paren"]
```

### 一些实践

js 行内注释
`/\/\/.*/g` [[Visual]](https://regexper.com/#%2F%5C%2F%5C%2F.*%2Fg)

```js
"console.log(); // comment".match(/\/\/.*/g);
//  ["// comment"]

"console.log();".match(/\/\/.*/g);
// null
```

星号包围的子字符串
`/\*[^\*]*\*/g` [[Visual]](https://regexper.com/#%2F%5C*%5B%5E%5C*%5D*%5C*%2Fg)

```js
"a*b*c*d*e".match(/\*[^\*]*\*/g);
//  ["*b*", "*d*"]

"permitted**".match(/\*[^\*]*\*/g);
//  ["**"]
```

注： 第一个和最后一个\*是被转义了的。在字符集里面的\*是可以不用转义的，这里转义是因为增强可读性。如果\*是紧跟在字符集的后面]\*则表示重复性。

## 组

按照字面意思来理解，组 就是 把一组正则括起来。这些组可以用来：

- 提取匹配到的子集
- 多次重复一个组
- 索引之前匹配到的组
- 增强可读性
- 允许复杂的替换

### 捕获组

捕获组是用(...)包围起来的：  
`/a(bcd)e/g` [[Visual]](<https://regexper.com/#%2Fa(bcd)e%2Fg>)

```js
"abcde".match(/a(bcd)e/g);
//  ["abcde"]

"abcdefg?".match(/a(bcd)e/g);
//  ["abcde"]
```

捕获组也通常用来重复一些字符。  
`/a(bcd)+e/g` [[Visual]](<https://regexper.com/#%2Fa(bcd)%2Be%2Fg>)

```js
"abcdefg".match(/a(bcd)+e/g);
//  ["abcde"]

"abcdbcdbcdef".match(/a(bcd)+e/g);
// ["abcdbcdbcde"]
```

捕获组也用来把一些逻辑相似的部分包围起来，增强可读性。
`/(\d\d\d\d)-W(\d\d)/g` [[Visual]](<https://regexper.com/#%2F(%5Cd%5Cd%5Cd%5Cd)-W(%5Cd%5Cd)%2Fg>)

```js
"2020-W12".match(/(\d\d\d\d)-W(\d\d)/g);
//  ["2020-W12"]

"12050-W50".match(/(\d\d\d\d)-W(\d\d)/g);
//  ["2050-W50"]
```

### 反向引用

反向引用支持索引之前匹配到的捕获组。匹配到的捕获组从\1 开始，接着是\2，以此类推。  
`/([abc])=\1=\1/g` [[Visual]](<https://regexper.com/#%2F(%5Babc%5D)%3D%5C1%3D%5C1%2Fg>)

```js
"a=a=a".match(/([abc])=\1=\1/g);
//  ["a=a=a"]

"ab=b=b".match(/([abc])=\1=\1/g);
//  ["b=b=b"]

"a=b=c".match(/([abc])=\1=\1/g);
// null
```

反向引用是指匹配到的捕获组，而不是捕获组这个规则。意思就是在上面示例中，如果捕获组匹配到了 a，那么后面的反向引用也都是 a。

`/\w+([,|])\w+\1\w+/g` [[Visual]](<https://regexper.com/#%2F%5Cw%2B(%5B%2C%7C%5D)%5Cw%2B%5C1%5Cw%2B%2Fg>)

```js
"comma,separated,values".match(/\w+([,|])\w+\1\w+/g);
//  ["comma,separated,values"]

"pipe|separated|values".match(/\w+([,|])\w+\1\w+/g);
//  ["pipe|separated|values"]

"wb|mixed,delimiters".match(/\w+([,|])\w+\1\w+/g);
//  null
```

### 非捕获组

非捕获组和捕获组很相似，除了它们并没有“捕获”的功能。它们的形式是(?:...)  
非捕获组通常和捕获组一起使用。
`/^\?(\w+)=(\w+)(?:&(\w+)=(\w+))*$/g` [[Visual]](<https://regexper.com/#%2F%5E%5C%3F(%5Cw%2B)%3D(%5Cw%2B)(%3F%3A%26(%5Cw%2B)%3D(%5Cw%2B))*%24%2Fg>)

```js
"?a=b&foo=bar".match(/^\?(\w+)=(\w+)(?:&(\w+)=(\w+))*$/g);
// ["?a=b&foo=bar"]

"?a=b".match(/^\?(\w+)=(\w+)(?:&(\w+)=(\w+))*$/g);
// ["?a=b"]
```

## 重复(量词)

表示匹配的字符或表达式的数量  
？ 表示正则表达式可选，即 0 或 1
`/a?/g` [[Visual]](https://regexper.com/#%2Fa%3F%2Fg)

```js
"".match(/a?/g);
//  [""]

"a".match(/a?/g);
// ["a", ""]
```

量词也可以用在捕获组或非捕获组后面
`/url: (www\.)?example\.com/g` [[Visual]](<https://regexper.com/#%2Furl%3A%20(www%5C.)%3Fexample%5C.com%2Fg>)

```js
"url: example.com".match(/url: (www\.)?example\.com/g);
//  ["url: example.com"

"url: www.example.com/foo".match(/url: (www\.)?example\.com/g);
//  ["url: www.example.com"]
```

\* 表示任意多个，包括 0；  
\+ 表示一个或多个，即至少一个  
{x} 表示确定的次数，{3}表示重复 3 次  
{x,y} 表示在 x,y 的范围内，包括 x,y。{2,4} 表示重复 2，3 或 4 次  
::: warning 警告
表示范围的时候{x,y} 在,之后不要有空格  
:::  
{x,} 至少 x 次，{3,} 表示至少 3 次

### 注意正则匹配中的贪婪

正则表达式默认都是贪婪的，它们在执行的时候，会尽可能多的匹配。
`/".*"/g` [[Visual]](https://regexper.com/#%2F%22.*%22%2Fg)

```js
'"quote"'.match(/".*"/g);
//  [""quote""]

'"quote"quote"'.match(/".*"/g);
//  [""quote"quote""]
```

**在量词字符(?+\*)后面紧跟?，可以阻止这种贪婪匹配**
`/".*?"/g` [[Visual]](https://regexper.com/#%2F%22.*%3F%22%2Fg)

```js
'"quote"'.match(/".*?"/g);
//  [""quote""]

'"quote"quote"'.match(/".*?"/g);
//  [""quote""]
```

阻止贪婪匹配的方法除了在量词后面紧跟?，还可以使用字符集匹配的方式，比如刚才的`/".*?"/g` ,还可以写成`/"[^"]"/g`，它的效果是一样的。

> [...] 懒惰匹配会在条件一满足的时候就停止匹配了，而贪婪匹配只有在条件不满足的时候才停止。

`/<.+>/g` [[Visual]](https://regexper.com/#%2F%3C.%2B%3E%2Fg)

```js
"<em>g r e e d y</em>".match(/<.+>/g);
//  ["<em>g r e e d y</em>"]
```

`/<.+?>/g` [[Visual]](https://regexper.com/#%2F%3C.%2B%3F%3E%2Fg)

```js
"<em>lazy</em>".match(/<.+?>/g);
//   ["<em>", "</em>"]
```

#### 一些例子

**比特币地址**
`/([13][a-km-zA-HJ-NP-Z0-9]{26,33})/g` [[Visual]](<https://regexper.com/#%2F(%5B13%5D%5Ba-km-zA-HJ-NP-Z0-9%5D%7B26%2C33%7D)%2Fg>)

**Youtebu Video**
`/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*?v=([^&\s]+).*/gm` [[Visual]](<https://regexper.com/#%2F(%3F%3Ahttps%3F%3A%5C%2F%5C%2F)%3F(%3F%3Awww%5C.)%3Fyoutube%5C.com%5C%2Fwatch%5C%3F.*%3Fv%3D(%5B%5E%26%5Cs%5D%2B).*%2Fgm>)

## 正则中的选择

选择符允许匹配几个词组中的**一个**。这个功能可能比字符集合有用多了，因为它更进一步的做了字符的限制。
选择符 用 `|` 表示  
`/foo|bar|baz/g` [[Visual]](https://regexper.com/#%2Ffoo%7Cbar%7Cbaz%2Fg)

```js
"foo baz".match(/foo|bar|baz/g);
//   ["foo", "baz"]

"Your food".match(/foo|bar|baz/g);
//  ["foo"]
```

如果正则表达式中只有一部分是“需要选择的”，则用组()把它们包起来，这个组可以是捕获组或者是非捕获组。
`/Try (foo|bar|baz)/g` [[Visual]](<https://regexper.com/#%2FTry%20(foo%7Cbar%7Cbaz)%2Fg>)

```js
"Try foo".match(/Try (foo|bar|baz)/g);
//  ["Try foo"]

"Try food".match(/Try (foo|bar|baz)/g);
//  ["Try foo"]
```

#### 一些例子 🌰

**匹配 100~250 之间的数字**
`/1\d\d|2[0-4]\d|250/g` [[Visual]](https://regexper.com/#%2F1%5Cd%5Cd%7C2%5B0-4%5D%5Cd%7C250%2Fg)

```js
"139 + 140 = 279".match(/1\d\d|2[0-4]\d|250/g);
//  ["139", "140"]

"$220".match(/1\d\d|2[0-4]\d|250/g);
//  ["220"]
```

**匹配十六进制的颜色值**
`/#[0-9A-F]{6}|[0-9A-F]{3}/g`

```js
"How about #73FA79?".match(/#([0-9A-F]{6}|[0-9A-F]{3})/g);
// ["#73FA79"]

"#FFF".match(/#([0-9A-F]{6}|[0-9A-F]{3})/g);
//  ["#FFF"]
```

但是这里需要注意的是，匹配个数多的放在前面。
::: tip 提示
正则引擎在匹配选择符的时候是从左往右的
:::

**匹配罗马字符**
`/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g` [[Visual]](<https://regexper.com/#%2F%5EM%7B0%2C4%7D(CM%7CCD%7CD%3FC%7B0%2C3%7D)(XC%7CXL%7CL%3FX%7B0%2C3%7D)(IX%7CIV%7CV%3FI%7B0%2C3%7D)%24%2Fg>)

```js
"MMXX".match(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g);
//  ["MMXX"]

"XX".match(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g);
//  ["XX"]

"IXI".match(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g);
// null
```

## 标志符

标志符或者称为修饰符，可以限制正则的一个匹配状态。修饰符通常紧跟在//后面。不同的正则引擎可能支持不用的修饰符，我们这里探讨的是通用的一些修饰符。

### 全局修饰符 (g)

到目前为止，本小书中写的所以正则示例都带有这个修饰符。如果没有带这个修饰符的话，正则匹配在第一次满足条件后就会停止，有点像之前提到过的懒惰匹配。

`/[aeiou]/g` [[Visual]](https://regexper.com/#%2F%5Baeiou%5D%2Fg)

```js
"corona".match(/[aeiou]/g);
//  ["o", "o", "a"]

"rhythm".match(/[aeiou]/g);
// null
```

### 大小写不敏感符 (i)

这个修饰符可以让正则匹配不区分大小写
`/#[0-9A-F]{6}/i` [[Visual]](https://regexper.com/#%2F%23%5B0-9A-F%5D%7B6%7D%2Fi)

```js
"#AE25AE".match(/#[0-9A-F]{6}/gi);
//  ["#AE25AE"]

"Even #a2ca2c?".match(/#[0-9A-F]{6}/gi);
//  ["#a2ca2c"]
```

## 锚点符

锚点符本身不是正则匹配的一部分，它们的作用是限制匹配的开始或结束位置  
锚点符另一种程度来说也是不可见的，因为它们并不会出现在匹配的结果中。

### 限制从字符串开头匹配

正则表达式的^符号限制必须从字符串的开头进行匹配，在字符串中间匹配到的都无效
`/^p/g` [[Visual]](https://regexper.com/#%2F%5Ep%2Fg)

```js
"photoshop".match(/^p/g);
//  ["p"]

"apple".match(/^p/g);
// null
```

### 限制字符串的结尾匹配

正则表达式的\$符号限制字符串的结尾必须匹配上，否则无效
`/p$/g` [[Visual]](https://regexper.com/#%2Fp%24%2Fg)

```js
"photoshop".match(/p$/g);
//  ["p"]

"apple".match(/p$/g);
// null
```

---

^和\$通常一起使用，为了匹配到整个字符串，而不是一个字符串中的一部分。
`/^p$/g` [[Visual]](https://regexper.com/#%2F%5Ep%24%2Fg)

```js
"p".match(/^p$/g);
//  ["p"]

"pea".match(/^p$/g);
// null
```

### 字边界符 --- \b

描述单词的前或后边界,前后边界是一个非单词字符值。
`/\bp/g` [[Visual]](https://regexper.com/#%2F%5Cbp%2Fg)

```js
"peach".match(/\bp/g);
//  ["p"]

"banana+peach".match(/\bp/g);
//  ["p"]
```

**单词字符包括哪些前文有提到过**
`/\bp\b/g` [[Visual]](https://regexper.com/#%2F%5Cbp%5Cb%2Fg)

```js
"word p word".match(/\bp\b/g);
//  ["p"]

"(paren)".match(/\bp\b/g);
// null
```

### 非字符边界符 --- \B

\b 也有它的非集 \B，描述单词的前或后边界,它匹配单词字符集
`/\Bp/g` [[Visual]](https://regexper.com/#%2F%5CBp%2Fg)

```js
"ape".match(/\Bp/g);
//  ["p"]

"(leap)".match(/\Bp/g);
//  ["p"]

"a pot".match(/\Bp/g);
//  null
```

::: tip 提醒
^...\$ 和 \b...\b 你可能会经常用到这两，来阻止一些意外的匹配。
:::

### 一些例子 🌰

#### 尾随空格

`/\s+$/gm` [[Visual]](https://regexper.com/#%2F%5Cs%2B%24%2Fgm)

```js
"abc  ".match(/\s+$/gm);
//  ["  "]

"abc def".match(/\s+$/gm);
// null
```

#### markdown 标题

`/^## /gm` [[Visual]](https://regexper.com/#%2F%5E%23%23%20%2Fgm)

```js
"# Heading 1".match(/^## /gm);
// null

"## Heading 2".match(/^## /gm);
// ["## "]
```

如果没有限制从开头匹配
`/## /gm` [[Visual]](https://regexper.com/#%2F%23%23%20%2Fgm)

```js
"## Heading 2".match(/## /gm);
// ["## "]

"### Heading 3".match(/## /gm);
// ["## "]
```

## 环视

::: tip 提醒
这一部分还在开发中
:::
环视是用来验证一些条件，本身不匹配任何字符。
|环视（lookaround） | 名称 | 做了什么 |
|------|------|-------------------------------- |
|(?=foo) |前瞻（lookahead） |判断紧跟在字符串中当前位置后面的内容是否是 foo |
|(?!foo) |否定前瞻（negative lookahead） |判断紧跟在字符串中当前位置后面的内容是否不是 foo |
|(?<=foo) |后视（lookbehind） |判断紧跟在字符串中当前位置前面的内容是否是 foo |
|(?<!foo) |否定后视（negative lookbehind） |判断紧跟在字符串中当前位置前面的内容是否不是 foo |
当我们在使用前瞻（lookahead）和后视（lookbehind）时，正则表达式在处理字符串的过程中，是不会在字符串上移动的，也就是说我们可以使用这种技术或者说手段来提前判定字符串是否符合一些情况。

### 前瞻

`/_(?=[aeiou])/g` [[Visual]](<https://regexper.com/#%2F_(%3F%3D%5Baeiou%5D)%2Fg>)
这句正则的解读是: 匹配字符串中\_后面的字符是否是[aeiou]中的一个，如果是，则算这种\_匹配成功，否则匹配无效。

```js
"e_e".match(/_(?=[aeiou])/g);
//  ["_"]

"_f".match(/_(?=[aeiou])/g);
// null
```

`/(.+)_(?=[aeiou])(?=\1)/g` [[Visual]](<https://regexper.com/#%2F(.%2B)_(%3F%3D%5Baeiou%5D)(%3F%3D%5C1)%2Fg>)

```js
"e_e".match(/(.+)_(?=[aeiou])(?=\1)/g);
//  ["e_"]

"uw_uw".match(/(.+)_(?=[aeiou])(?=\1)/g);
//  ["uw_"]

"uw_uwa".match(/(.+)_(?=[aeiou])(?=\1)/g);
// ["uw_"]

"f_f".match(/(.+)_(?=[aeiou])(?=\1)/g);
// null
```

在(?=[aeiou])之后，正则引擎就没有再扫描了，也没有检查(?=\1)是否和之前的捕获组一致

### 否定前瞻

`/_(?![aeiou])/g` [[Visual]](<https://regexper.com/#%2F_(%3F!%5Baeiou%5D)%2Fg>)
这个正则的解读是：匹配字符串中的*，*后紧跟的不是[aeiou]中的任何一个字符

```js
"e_e".match(/_(?![aeiou])/g);
// null

"_f".match(/_(?![aeiou])/g);
//  ["_"]
```

否定前瞻通常用来限制一些字符的匹配
`/foo(?!bar)/g` [[Visual]](<https://regexper.com/#%2Ffoo(%3F!bar)%2Fg>)

```js
"foobaz".match(/foo(?!bar)/g);
//  ["foo"]

"bazfoobar".match(/foo(?!bar)/g);
// null
```

### 后视

::: warn 警告
这个功能在 js ES2018 才提供
:::

::: tip 提醒
TODO //
:::

## 一些例子

### 密码验证

`/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/` [[Visual]](<https://regexper.com/#%2F%5E(%3F%3D.*%5Cd)(%3F%3D.*%5Ba-z%5D)(%3F%3D.*%5BA-Z%5D)(%3F%3D.*%5Ba-zA-Z%5D).%7B8%2C%7D%24%2F>)

```js
"zsofpghedake".match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
//  null

"zSoFpghEdaK4E".match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g);
//  ["zSoFpghEdaK4E"]
```
