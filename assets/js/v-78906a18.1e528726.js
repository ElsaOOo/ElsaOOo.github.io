(self.webpackChunkmy_blog_next=self.webpackChunkmy_blog_next||[]).push([[522],{4803:(a,e,n)=>{"use strict";n.r(e),n.d(e,{data:()=>s});const s={key:"v-78906a18",path:"/java/variable-constant.html",title:"变量与常量",lang:"zh-CN",frontmatter:{lang:"zh-CN",description:"java 学习， java 教程， java tutorial，java变量与常量",tags:["java 变量与常量"]},excerpt:"",headers:[{level:3,title:"常量",slug:"常量",children:[]},{level:3,title:"变量",slug:"变量",children:[]}],filePathRelative:"java/variable-constant.md",git:{updatedTime:1617441033e3,contributors:[]}}},4911:(a,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>t});const s=(0,n(6252).uE)('<h1 id="变量与常量"><a class="header-anchor" href="#变量与常量">#</a> 变量与常量</h1><p><strong>文章引用请注明出处</strong></p><h3 id="常量"><a class="header-anchor" href="#常量">#</a> 常量</h3><p>Java 中的常量是一个值，在程序运行的过程中不能再次发生改变。</p><p>基本类型的值都可以认为是常量，比如 整型 4、浮点型 3.4 、字符型 &#39;a&#39; 、布尔型 true。</p><p>还有一类，String 类型的，它属于引用类型，但是它的值可以看做是常量。</p><p>常量存储在内存中的常量缓冲区(常量池，这是 JVM 在运行程序时在内存中开辟的一块空间)，有且只有一份。</p><p>常量池中的值默认空间大小： 32bit ---&gt; int，64bit ---&gt; double。</p><h3 id="变量"><a class="header-anchor" href="#变量">#</a> 变量</h3><p>变量是一个内存空间(可以看成是一个小容器)。是在栈内存中开辟的一块内存空间。</p><p>空间在开辟(变量申明)的时候必须指定类型 变量名(变量名要符合命名规则)。</p><p>变量空间的内容有且只有一个。</p><p>空间内的内容的类型与定义时一致，内容可以改变。</p><p>在赋值操作时会根据实际类型分配不同大小，比如：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">byte</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// byte 类型占1个字节，在赋值时会自动从32位变为8位</span>\n<span class="token keyword">float</span> b <span class="token operator">=</span> <span class="token number">3.14F</span><span class="token punctuation">;</span> <span class="token comment">// float类型的占4个字节，在赋值时要显式申明是float类型的，不然会分配64位</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>',15),t={render:function(a,e){return s}}}}]);