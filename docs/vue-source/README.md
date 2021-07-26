<RenderRouterView :routes="routesNames" />

<script>
import {  reactive } from 'vue'
const routes = [
  // {
  //   name: '你应该知道的一些正则知识',
  //   path: '/regex/regex-you-should-know'
  // },
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
