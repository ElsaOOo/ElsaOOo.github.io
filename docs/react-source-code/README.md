<RenderRouterView :routes="routesNames" />


<script>
import {  reactive } from 'vue'
const routes = [
  {
    name: 'React.createElement',
    path: '/react-source-code/createElement'
  },
  {
    name: 'react-router 源码阅读',
    path: '/react-source-code/react-router'
  },
  {
    name: 'React.memo',
    path: '/react-source-code/memo'
  },
  {
    name: ' React.createRef',
    path: '/react-source-code/ref-lazy'
  },
  {
    name: 'setState 是同步还是异步的？',
    path: '/react-source-code/setState'
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