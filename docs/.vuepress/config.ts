import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { readFiles } = require('./scripts/read-files');

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: "ElsaOOo Blog",
  description: "ElsaOOo Blog, 前端笔记",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    navbar: [
      {
        text: "关于我",
        link: "/about-me/",
      },
    ],
    sidebar: [
      {
        isGroup: true,
        text: 'JavaScript',
        children: [
          "/javascript/acron-demo.md",
          "/javascript/data-types.md",
          "/javascript/flatten-array.md"
        ],
      },
      {
        text: "react源码阅读",
        isGroup: true,
        children: readFiles('react-source-code'),
      },
      {
        text: "数据结构与算法",
        isGroup: true,
        children: ["/algorithm/bubble-sort.md", "/algorithm/insert-sort.md"],
      },
      {
        text: "electron 实战",
        isGroup: true,
        children: ["/electron/01.md"],
      },
      {
        text: "js正则",
        isGroup: true,
        children: ["/regex/regex-you-should-know.md"],
      },
      {
        text: "Java学习",
        isGroup: true,
        children: ["/java/basic-types.md", "/java/variable-constant.md"],
      },
    ],
    lastUpdated: false,
  },
  markdown: {
    code: {
      lineNumbers: false
    }
  },
})