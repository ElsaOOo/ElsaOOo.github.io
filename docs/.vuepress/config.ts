import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import HtmlWebpackPlugin from "html-webpack-plugin";
const { path } = require("@vuepress/utils");

// const { readFiles } = require('./scripts/read-files');

export default defineUserConfig<DefaultThemeOptions>({
  lang: "zh-CN",
  title: "ElsaOOo Blog",
  description: "ElsaOOo Blog, 前端笔记",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["script", { src: "/prism.js", defer: true }],
  ],
  theme: path.resolve(__dirname, "./theme"),
  clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.ts"),
  plugins: [["@vuepress/plugin-nprogress"], ["@vuepress/plugin-back-to-top"]],
  markdown: {
    code: {
      lineNumbers: false,
      highlightLines: true,
    },
  },
});
