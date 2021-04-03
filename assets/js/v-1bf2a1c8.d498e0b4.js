(self.webpackChunkmy_blog_next=self.webpackChunkmy_blog_next||[]).push([[83],{9186:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>e});const e={key:"v-1bf2a1c8",path:"/react-source-code/memo.html",title:"React.memo",lang:"zh-CN",frontmatter:{lang:"zh-CN",description:"react 源码解析，react momo"},excerpt:"",headers:[{level:3,title:"源码",slug:"源码",children:[]},{level:3,title:"那这个和 React.useMemo 有什么关系呢？",slug:"那这个和-react-usememo-有什么关系呢",children:[]},{level:3,title:"实例 🌰",slug:"实例-🌰",children:[]}],filePathRelative:"react-source-code/memo.md",git:{updatedTime:1617441033e3,contributors:[]}}},3751:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>p});const e=(0,a(6252).uE)('<h1 id="react-memo"><a class="header-anchor" href="#react-memo">#</a> React.memo</h1><p><em>文章引用请注明出处</em></p><p>React.memo 是 React 的顶层 API 之一，React.memo 其实是一个高阶组件，它和 React.PureComponent 非常相似，但是<strong>只适用于函数组件</strong>。</p><p>如果所用的函数组件在给定相同 props 的情况下渲染相同的结果，这时候可以使用 React.memo，来<strong>记忆</strong>组件渲染结果的方式从而提高组件的性能表现。使用 React.memo，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。</p><p>但是，React.memo 仅检查 props 的变更，如果函数组件被<code>React.memo</code>包裹，且其实现中拥有<code>useState</code>或<code>useContext</code>的 hook，当 context 变化时，它仍会重新渲染。</p><p>默认情况下其只会<strong>对复杂对象做浅层对比</strong>，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。</p><h3 id="源码"><a class="header-anchor" href="#源码">#</a> 源码</h3><p><code>memo</code> 的位置在 packages/react/src/memo.js 中</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> memo<span class="token operator">&lt;</span>Props<span class="token operator">&gt;</span><span class="token punctuation">(</span>\n  type<span class="token operator">:</span> React$ElementType<span class="token punctuation">,</span>\n  compare<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">oldProps<span class="token operator">:</span> Props<span class="token punctuation">,</span> newProps<span class="token operator">:</span> Props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean\n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    $$<span class="token keyword">typeof</span><span class="token operator">:</span> <span class="token constant">REACT_MEMO_TYPE</span><span class="token punctuation">,</span>\n    type<span class="token punctuation">,</span>\n    compare<span class="token operator">:</span> compare <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> compare<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>memo 的定义很简单，传入两个参数，第一个是 React 组件，第二个是一个比较函数，函数参数是旧的 props 和新的 props，返回值是 boolean，如果为 true 表示该组件不需要重新渲染，如果为 false 表示重新渲染该组件。</p><h3 id="那这个和-react-usememo-有什么关系呢"><a class="header-anchor" href="#那这个和-react-usememo-有什么关系呢">#</a> 那这个和 React.useMemo 有什么关系呢？</h3><p>没什么关系！</p><p>因为这两个 api 里面都有 memo，我刚开始还以为它们之间有什么联系，但是他两的用处是不同的。</p><p><code>useMemo</code> 的源码在 packages/react/src/ReactHooks.js 文件中，</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useMemo</span><span class="token punctuation">(</span>\n  <span class="token function-variable function">create</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> mixed<span class="token punctuation">,</span>\n  inputs<span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span>\n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> dispatcher <span class="token operator">=</span> <span class="token function">resolveDispatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> dispatcher<span class="token punctuation">.</span><span class="token function">useMemo</span><span class="token punctuation">(</span>create<span class="token punctuation">,</span> inputs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>useMemo</code> 函数接收两个参数，第一个参数是一个函数，第二个参数是 使用前一个函数所涉及到的一些依赖项。</p><p><code>useCallback</code> 的定义和这个很像：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useCallback</span><span class="token punctuation">(</span>\n  <span class="token function-variable function">callback</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> mixed<span class="token punctuation">,</span>\n  inputs<span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span>\n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> dispatcher <span class="token operator">=</span> <span class="token function">resolveDispatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> dispatcher<span class="token punctuation">.</span><span class="token function">useCallback</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> inputs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>他俩定义是一样的，但是函数签名有一点不同：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>useCallback<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>callback<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> deps<span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>\nuseMemo<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token function-variable function">nextCreate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">,</span> deps<span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>useCallback</code> 和 <code>useMemo</code> 都可缓存函数的引用或值，但从更细的使用角度来说，<code>useCallback</code> 缓存函数的引用，<code>useMemo</code> 缓存计算数据的值。</p><h3 id="实例-🌰"><a class="header-anchor" href="#实例-🌰">#</a> 实例 🌰</h3><div class="language-react ext-react line-numbers-mode"><pre class="language-react"><code>// 父组件\nconst App = () =&gt; {\n  const [count, setCount] = useState(0);\n  const [count2, setCount2] = useState(0);\n  const handleClick = () =&gt; {\n    setCount(count + 1);\n  };\n  const handleClick2 = () =&gt; {\n    setCount2(count2 + 1);\n  };\n  return (\n    &lt;div className=&quot;app&quot;&gt;\n      &lt;div className=&quot;header&quot;&gt;Header&lt;/div&gt;\n      &lt;div className=&quot;content&quot;&gt;\n        &lt;div className=&quot;row&quot;&gt;\n          &lt;div&gt;count1: {count}&lt;/div&gt;\n          &lt;div&gt;count2: {count2}&lt;/div&gt;\n          &lt;div&gt;\n            &lt;button onClick={handleClick}&gt;count&lt;/button&gt;\n            &lt;button onClick={handleClick2}&gt;count2&lt;/button&gt;\n          &lt;/div&gt;\n          &lt;Child /&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  );\n};\n\nexport default App;\n\n// 子组件\nconst Child = () =&gt; {\n  console.log(&quot;render child&quot;);\n  return &lt;div&gt;child&lt;/div&gt;;\n};\n\nexport default React.memo(Child);\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>这里的子组件 Child 如果没有用 React.memo 包裹，那么父组件每一次改变自身的 state，Child 组件都会跟着渲染一次。加上 React.memo 之后，如果没有额外传入 props 的情况下，Child 组件只会渲染第一次，随后父组件自身 state 的改变并不会影响子组件的渲染。、</p><div class="language-react ext-react line-numbers-mode"><pre class="language-react"><code>&lt;Child parentCount={count} /&gt;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里的子组件接收父组件的一个 prop，这时候父组件的 count 变量每改变一次子组件也会跟着渲染一次，但是父组件的其他 state 变量的改变不会引起 Child 组件的重新渲染，这里只跟传入子组件的变量相关。 所以尽量子组件用到什么 prop 就传什么 prop，不要用...props 这样的形式把所有的都传给子组件。</p><p>但是很多情况下，父组件传给子组件的不会简单就是一个基础类型的值，更多的是一个数组或者一个对象。</p><div class="language-react ext-react line-numbers-mode"><pre class="language-react"><code>const App = () =&gt; {\n  const [value, setValue] = useState({\n    name: &quot;tom&quot;,\n    age: 20,\n  });\n  const handleClick = () =&gt; {\n    setValue((prev) =&gt; ({\n      ...prev,\n      age: prev.age + 1,\n    }));\n  };\n  return (\n    &lt;div className=&quot;app&quot;&gt;\n      &lt;div className=&quot;header&quot;&gt;Header&lt;/div&gt;\n      &lt;div className=&quot;content&quot;&gt;\n        &lt;div className=&quot;row&quot;&gt;\n          &lt;div&gt;value: {JSON.stringify(value)}&lt;/div&gt;\n          &lt;div&gt;\n            &lt;button onClick={handleClick}&gt;changeValue&lt;/button&gt;\n          &lt;/div&gt;\n          &lt;Child parentValue={value} /&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  );\n};\n\nexport default App;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>这时候每改变一次 value 中的某个属性的值，子组件就会渲染一次，如示例中所示，如果我们想要子组件的渲染和父组件的 age 属性的改变无关的话，我们可以给 React.memo 传入第二个参数，是一个函数：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>type <span class="token function-variable function">compare</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">oldProps<span class="token punctuation">,</span> newProps</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>根据这个 compare 函数的返回值来判断要不要渲染子组件，true 就不渲染，false 就渲染。</p>',31),p={render:function(n,s){return e}}}}]);