<template>
  <ul class="file-names">
    <li v-for="item in routes" :key="item.path" class="file">
      <a :href="isDir ? item.path : item.path + '.html'" :class="['file-link', isDir ? 'dir-link' : '']">{{item.name}}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    routes: {
      type: Array,
      default: () => ([])
    },
    isDir: {
      type: Boolean,
      default: false,
    }
  },
  setup (props) {
    
    return {
      ...toRefs(props),
    }
  }
})
</script>

<style lang="less">
.file-names {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .file {
    flex: 45%;
    .file-link {
      color: yellowgreen;
      &.dir-link {
        font-weight: bold;
        color: #64fcda;
      }
    }
  }
}
</style>