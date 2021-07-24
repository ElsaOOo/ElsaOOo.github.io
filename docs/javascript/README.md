<RenderRouterView :routes="routesNames" />


<script>
import {  reactive } from 'vue'
const routes = [
  {
    name: '如何自己实现一个简单的tree shaking',
    path: '/javascript/acron-demo'
  },
  {
    name: 'JS 数组扁平化的几种方式',
    path: '/javascript/flatten-array'
  },
  {
    name: 'JavaScript 的数据类型',
    path: '/javascript/data-types'
  },
  {
    name: 'js 中的对象属性有顺序么？',
    path: '/javascript/js-object-props-order'
  },
  {
    name: '面试题之 script 标签中 async 和 defer 属性的区别',
    path: '/javascript/script-async-defer'
  },
  {
    name: 'Webpack custom loader',
    path: '/javascript/custom-loader'
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