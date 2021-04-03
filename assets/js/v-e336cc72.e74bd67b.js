(self.webpackChunkmy_blog_next=self.webpackChunkmy_blog_next||[]).push([[602],{6468:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-e336cc72",path:"/posts/js-object-props-order.html",title:"js 中的对象属性有顺序么？",lang:"zh-CN",frontmatter:{description:"js 中的对象属性有顺序么？"},excerpt:"",headers:[],filePathRelative:"posts/js-object-props-order.md",git:{updatedTime:1617441033e3,contributors:[]}}},7944:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h1 id="js-中的对象属性有顺序么"><a class="header-anchor" href="#js-中的对象属性有顺序么">#</a> js 中的对象属性有顺序么？</h1><p>最近在修一个 bug 的时候发现，一个 js 对象数组经过<code>Lodash</code>的 groupBy 方法后，输出的对象属性顺序发生了变化。</p><p>虽然<code>Lodash</code>的官方文档是这么写的：</p><blockquote><p>The order of grouped values is determined by the order they occur in <code>collection</code></p></blockquote><p>但实际情况是：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> rawData <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;分组一&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;分组二&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> groupedData <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">groupBy</span><span class="token punctuation">(</span>rawData<span class="token punctuation">,</span> <span class="token string">&quot;group&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>我期望按照顺序输出，是这样的：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> groupedData <span class="token operator">=</span> <span class="token punctuation">{</span>\n  分组一<span class="token operator">:</span> <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;分组一&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token number">0</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  分组二<span class="token operator">:</span> <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;分组二&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>但实际的输出结果是：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> groupedData <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token number">0</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  分组一<span class="token operator">:</span> <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;分组一&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  分组二<span class="token operator">:</span> <span class="token punctuation">{</span>\n    value<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>\n    group<span class="token operator">:</span> <span class="token string">&quot;分组二&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>groupBy 之后的对象属性排序了。但实际情况是就算不用 lodash 的 groupBy 方法，js 的对象属性也会出现这样的情况。</p><p>那 js 的对象属性可能是按照某种顺序排序的？</p><p>我们可以在控制台里试一下：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> b<span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&quot;nn&quot;</span><span class="token punctuation">,</span> 测试<span class="token operator">:</span> <span class="token string">&quot;test&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment">// 输出 {1: &quot;nn&quot;, b: &quot;1&quot;, 测试: &quot;test&quot;}</span>\n\n<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token punctuation">{</span> 测试<span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&quot;nn&quot;</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token string">&quot;1&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment">// 输出 {1: &quot;nn&quot;, 测试: &quot;test&quot;, b: &quot;1&quot;}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>果然看起来是有顺序的。那这样的话，是按照什么顺序排的呢？</p><p>按照例子中的结果，对象属性先按数字型的排序，再是非数字型的属性。</p><p>如果属性中既存在数字型的属性，又存在对应字符型的属性，那么后出现的会覆盖之前出现的。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> b<span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&quot;nn&quot;</span><span class="token punctuation">,</span> 测试<span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&quot;mm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment">// 输出 {1: &quot;mm&quot;, b: &quot;1&quot;, 测试: &quot;test&quot;}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>结合网上网友得出以下结论：</p><blockquote><p>Chrome 等新版浏览器 JS 引擎遵循新版 ECMA-262 5th,使用 for-in 语句遍历对象属性时遍历书序并非属性构建顺序。而 IE6、7、8 等旧版本浏览器的 JS 解析引擎遵循的是较老的 ECMA-262 3rd，属性遍历顺序由属性构建的顺序决定。Chrome 的 JS 引擎遍历对象属性时会遵循一个规律：<strong>它们会先提取所有 key 的 parseFloat 值为非负整数的属性，然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有属性。</strong></p></blockquote>',20),t={render:function(n,s){return p}}}}]);