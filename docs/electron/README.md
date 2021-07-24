<RenderRouterView :routes="routesNames" />


<script>
import {  reactive } from 'vue'
const routes = [
  {
    name: 'Electron 安装',
    path: '/electron/01'
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