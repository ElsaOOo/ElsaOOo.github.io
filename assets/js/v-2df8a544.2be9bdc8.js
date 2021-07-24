(self.webpackChunkmy_blog_next=self.webpackChunkmy_blog_next||[]).push([[417],{478:(e,n,t)=>{"use strict";t.r(n),t.d(n,{data:()=>o});const o={key:"v-2df8a544",path:"/electron/01.html",title:"Electron 安装",lang:"zh-CN",frontmatter:{lang:"zh-CN",description:"Electron, Electron 安装",tags:["electron 安装"]},excerpt:"",headers:[]}},7341:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>a});const o=(0,t(6252).uE)('<h1 id="electron-安装" tabindex="-1"><a class="header-anchor" href="#electron-安装" aria-hidden="true">#</a> Electron 安装</h1><p><strong>文章引用请注明出处</strong></p><p>Electron 使用纯Javascript 调用丰富的原生(操作系统)APIs来创造桌面端应用。</p><p>初始化一个electron应用很简单, 首先确保电脑中安装了node ， node 版本在10以上。</p><p>一个最基本的electron 应用目录</p><div class="language-markdown ext-md"><pre class="language-markdown"><code>your-app/\n├── package.json\n├── main.js\n└── index.html\n</code></pre></div><p>在package.json里面设置</p><div class="language-json ext-json"><pre class="language-json"><code>{\n  &quot;name&quot;: &quot;your-app&quot;,\n  &quot;version&quot;: &quot;0.1.0&quot;,\n  &quot;main&quot;: &quot;main.js&quot;,\n  &quot;scripts&quot;: {\n    &quot;start&quot;: &quot;electron .&quot;\n  }\n}\n\n</code></pre></div><p>这里要下载electron 包，可以在工程目录中下载，也可以全局下载。</p><div class="language-bash ext-sh"><pre class="language-bash"><code>npm install --save-dev electron\n</code></pre></div><p>安装这一步，容易发生Error。比如electron这个包一直下载失败</p><p>在mac 环境下，打开 <code>~/.npmrc</code> 这个文件，修改以下配置：</p><div class="language-markdown ext-md"><pre class="language-markdown"><code>registry= https://registry.npm.taobao.org\nelectron_mirror=&quot;https://npm.taobao.org/mirrors/electron/&quot;\n</code></pre></div><p>然后再执行install 命令，就可以成功安装。</p>',14),a={render:function(e,n){return o}}}}]);