<RenderRouterView :routes="routesNames" />


<script>
import {  reactive } from 'vue'
const routes = [
  {
    name: '冒泡排序',
    path: '/algorithm/bubble-sort'
  },
  {
    name: '插入排序',
    path: '/algorithm/insert-sort'
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