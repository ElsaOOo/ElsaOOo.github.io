<RenderRouterView :routes="routesNames" :isDir="true" />


<script>
import {  reactive } from 'vue'
const routes = [
  {
    name: 'JavaScript',
    path: '/javascript'
  },
  {
    name: 'Java基础',
    path: '/java'
  },
  {
    name: 'react源码阅读',
    path: '/react-source-code'
  },
  {
    name: '数据结构与算法',
    path: '/algorithm'
  },
  {
    name: 'js正则',
    path: '/regex'
  },
  {
    name: 'electron 实战',
    path: '/electron'
  },
  {
    name: '未分类',
    path: '/posts'
  },
]

export default {
  setup() {
    const routesNames = reactive(routes);
    return {
      routesNames
    }
  }
}
</script>