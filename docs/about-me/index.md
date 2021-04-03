---
title: "关于我"
description: "关于我"
---

<div class="about-me-page">
    <div class="intro">
      <p>
        <span class="large-text">我</span>
        是一名前端开发程序员👩‍💻。喜欢编程💻，喜欢学习新技术🤔。
      </p>
      <p>
        目前我的技术栈是
        <span class="underline">react + vue + typescript</span>
        。了解后端语言JAVA、Python，目前在学习Haskell函数式编程语言，
        之后还想了解下移动端📱编程语言Swift。
      </p>
    </div>
    <div class="my-projects">
      <div class="row title">
        <img src="/images/projects.png" alt="projects" class="img" />
        <span>我的开源项目</span>
      </div>
      <ul class="projects">
        <li class="project-item">
          <div>
            <span class="item-label">npm包：</span>
            <a
              href="https://www.npmjs.com/package/cercare"
              target="_blank"
            >https://www.npmjs.com/package/cercare</a>
          </div>
          <div class="row-flex">
            <span class="item-label">简介:</span>
            <span>一个在命令行中搜索 markdown 文件并在命令行中显示的工具。</span>
          </div>
        </li>
        <li class="project-item">
          <div>
            <span class="item-label">npm包：</span>
            <a
              href="https://www.npmjs.com/package/easy-file-elsaoo"
              target="_blank"
            >https://www.npmjs.com/package/easy-file-elsaoo</a>
          </div>
          <div class="row-flex">
            <span class="item-label">简介:</span>
            <span>
              这个 npm
              包的作用是快速建立项目工程目录模板文件，因为工程目录文件大多是有共性的，在开始一个任务前可以使用该
              包 快速建立一个工作模板目录。
            </span>
          </div>
        </li>
        <li class="project-item">
          <div>
            <span class="item-label">npm包：</span>
            <a
              href="https://www.npmjs.com/package/askweather"
              target="_blank"
            >https://www.npmjs.com/package/askweather</a>
          </div>
          <div class="row-flex">
            <span class="item-label">简介:</span>
            <span>一个在命令行查询中国各个地方(省市)天气的应用。</span>
          </div>
        </li>
      </ul>
    </div>
    <ul class="social-links">
      <li class="row">
        <img src="/images/Github.png" alt="github" class="icon" />
        Github:
        <a
          href="https://github.com/ElsaOOo"
          target="_blank"
          class="link"
        >https://github.com/ElsaOOo</a>
      </li>
      <li class="row">
        <img src="/images/programming.png" alt="leetcode" class="icon" />
        Leetcode:
        <a
          href="https://leetcode-cn.com/u/zzautumn-2/"
          target="_blank"
          class="link"
        >https://leetcode-cn.com/u/zzautumn-2/</a>
      </li>
      <li class="row">
        <img src="/images/email.png" alt="email" class="icon" />
        Email: yjjjng0901@126.com
      </li>
    </ul>
  </div>

<style lang="less" scoped>
.about-me-page {
  .row-flex {
    display: flex;
  }
  .intro {
    .large-text {
      font-size: 24px;
      font-weight: 700;
    }
    .underline {
      text-decoration: underline;
    }
  }
  .my-projects {
    margin-top: 50px;
    .title {
      display: flex;
      align-items: center;
      .img {
        margin-right: 15px;
      }
    }
    .projects {
      list-style: none;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
      .project-item {
        margin-bottom: 25px;
        .item-label {
          min-width: 70px;
          display: inline-block;
        }
      }
    }
  }
  .social-links {
    list-style: none;
    padding-left: 0;
    margin-top: 50px;
    .row {
      margin-bottom: 15px;
    }
    .icon {
      width: 24px;
      margin-right: 10px;
      vertical-align: bottom;
    }
    .link {
      display: inline-block;
    }
  }
}
</style>
