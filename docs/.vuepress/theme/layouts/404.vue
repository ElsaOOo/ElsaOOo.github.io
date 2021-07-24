<template>
  <div>
    no such page: {{currentPath}}
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';

export default {
  setup () {
    const route = useRoute()
    
    return {
      currentPath: route.path,
    }
  }
}
</script>

<style lang="less">
body {
  background: #00303e;
  color: #ffffff;
  font-family: monospace;
}

</style>