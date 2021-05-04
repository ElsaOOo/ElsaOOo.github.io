(self.webpackChunkmy_blog_next=self.webpackChunkmy_blog_next||[]).push([[194],{9262:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-3577131a",path:"/javascript/data-types.html",title:"JavaScript 的数据类型",lang:"zh-CN",frontmatter:{lang:"zh-CN",description:"js 基本数据类型"},excerpt:"",headers:[{level:3,title:"undefined",slug:"undefined",children:[]},{level:3,title:"null",slug:"null",children:[]},{level:3,title:"number",slug:"number",children:[]},{level:3,title:"Symbol",slug:"symbol",children:[]},{level:3,title:"Object",slug:"object",children:[]}],filePathRelative:"javascript/data-types.md",git:{contributors:[]}}},7263:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h1 id="javascript-的数据类型"><a class="header-anchor" href="#javascript-的数据类型">#</a> JavaScript 的数据类型</h1><p><em>文章引用请注明出处</em></p><p>javascript 的数据类型有：</p><ul><li><p>undefined</p></li><li><p>null</p></li><li><p>boolean</p></li><li><p>string</p></li><li><p>Symbol</p></li><li><p>number</p></li><li><p>object</p></li></ul><p>前 6 种属于基础类型，<code>基础类型</code>的数据在被引用或拷贝时是值传递的，也就是说会创建一个完全相等的变量；object 属于<code>引用类型</code>，引用类型只是在栈中创建一个指针指向堆内存中原有的变量，实际上两个变量是”共享“这个数据的，并没有重新创建一个新的数据。</p><p>这里捡重要的讲一下：</p><h3 id="undefined"><a class="header-anchor" href="#undefined">#</a> undefined</h3><p>undefined 类型数据只有一个值：undefined</p><p>以下这些方式可以得到 undefined 值：</p><ul><li><p>引用已申明但未初始化的变量</p></li><li><p>引用未定义的对象属性</p></li><li><p>执行无返回值函数</p></li><li><p>执行 void 表达式</p></li><li><p>全局常量 window.undefined 或 undefined</p></li></ul><p>其中推荐用 void 0 来表示 undefined，这样不仅可以少用一个变量或者对象的属性，而且 void 0 是一个表达式，可以用于三目运算符中：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>\nx <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">;</span>\n</code></pre></div><h5 id="判断一个值是否是-undefined"><a class="header-anchor" href="#判断一个值是否是-undefined">#</a> 判断一个值是否是 undefined</h5><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// 1 这个方法不准确，x可能是一个falthy的值</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">//</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 2 这个方法是准确的，但是最好先检查x是否已经申明</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// 3 这个方法也是准确的，同样的也要检查x是否申明，否则会出现refrenceError</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">&quot;undefined&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h3 id="null"><a class="header-anchor" href="#null">#</a> null</h3><p>null 类型的值只有一个: null</p><p>null 和 undefined 都可以表示空值，当使用 ”==“ 的时候，它们是相等的，但是 null 是 js 的<code>保留关键字</code>，而 undefined 只是一个常量。</p><h3 id="number"><a class="header-anchor" href="#number">#</a> number</h3><ul><li><p>NaN(Not a Number) 通常在计算失败的时候会得到该值，要判断一个变量是否为 NaN，可以通过 Number.isNaN 函数来判断。</p></li><li><p>Infinity 是无穷大，加上负号 ”-“ 会变成无穷小，在某些场景下比较有用。比如通过数值来表示权重或者优先级，Infinity 可以表示最高优先级或最大权重。</p></li></ul><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// 将10进制转换成其他进制的数，可以用toString()</span>\n<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;1010&#39;</span>\n\n<span class="token comment">// 精度问题</span>\n<span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span><span class="token punctuation">;</span> <span class="token comment">// 0.30000000000000004</span>\n<span class="token comment">// 解决精度问题</span>\n<span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toPrecision</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h3 id="symbol"><a class="header-anchor" href="#symbol">#</a> Symbol</h3><p>Symbol 是 ES6 中引入的新数据类型，表示一个唯一的常量</p><p>实际举例：</p><p>避免常量覆盖</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">KEY</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  baidu<span class="token operator">:</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span>\n  alibaba<span class="token operator">:</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token constant">KEY</span><span class="token punctuation">.</span>baidu<span class="token operator">:</span>\n    <span class="token comment">// ...</span>\n    <span class="token keyword">case</span> <span class="token constant">KEY</span><span class="token punctuation">.</span>alibaba<span class="token operator">:</span>\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 这里定义常量KEY属性的值的时候，容易造成值的重复，比如</span>\n<span class="token keyword">const</span> <span class="token constant">KEY</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  baidu<span class="token operator">:</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span>\n  alibaba<span class="token operator">:</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n  bilibili<span class="token operator">:</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 如果用Symbol作为属性值，就不会出现重复的现象</span>\n<span class="token keyword">const</span> <span class="token constant">KEY</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  baidu<span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  alibaba<span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n  bilibili<span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment">// 这里我们只关心键的类型，而不关心属性的值</span>\n</code></pre></div><p>避免对象属性覆盖</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">let</span> o <span class="token operator">=</span> <span class="token punctuation">{</span>\n  user<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&quot;tom&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment">// 这里的o对象，有很多属性，我们想再往o上添加属性时，为了不覆盖它原有的属性，可以用Symbol得到一个键值</span>\n<span class="token keyword">const</span> s <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\no<span class="token punctuation">[</span>s<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1234</span><span class="token punctuation">;</span>\n<span class="token comment">// 获取这个Symbol属性的值</span>\no<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 1234</span>\n</code></pre></div><h3 id="object"><a class="header-anchor" href="#object">#</a> Object</h3><p>简单的说，Object 类型数据就是<code>键值对的集合</code>，键是一个字符串(或者 Symbol)，值可以是任意类型的值。</p><p>复杂的说，Object 又包括很多子类型，比如 Date，Array，Set，RegExp...</p><h5 id="对象的拷贝"><a class="header-anchor" href="#对象的拷贝">#</a> 对象的拷贝</h5><p>由于引用类型在赋值时只传递指针，这种拷贝方式称为<code>浅拷贝</code></p><p>而创建一个新的与之相同的引用类型数据的过程称之为<code>深拷贝</code>。</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">it</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">typeof</span> it<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// =&gt; [&quot;undefined&quot;, &quot;object&quot;, &quot;boolean&quot;, &quot;number&quot;, &quot;string&quot;, &quot;symbol&quot;, &quot;object&quot;];</span>\n</code></pre></div><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">clone</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 这里引用es6中的weakMap是为了防止循环引用</span>\n  <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">function</span> <span class="token function">deep</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">!==</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> data<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> keys <span class="token operator">=</span> <span class="token punctuation">[</span>\n      <span class="token operator">...</span>Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token operator">...</span>Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> exist <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>exist<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> keys<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n      result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> <span class="token function">deep</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&quot;tom&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> o2 <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>o1<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { name: &quot;tom&quot; }</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o1 <span class="token operator">===</span> o2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>\n</code></pre></div>',35),t={render:function(n,s){return p}}}}]);