<RenderRouterView :routes="routesNames" />


<script>
import {  reactive } from 'vue'
const routes = [
  {
    name: '日常开发中遇到问题集合',
    path: '/posts/daily-issues'
  },
  {
    name: 'Docker + Nginx 实践 (mac 版)',
    path: '/posts/docker-nginx'
  },
  {
    name: 'TypeScript 泛型应用(一)',
    path: '/posts/ts-generic'
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