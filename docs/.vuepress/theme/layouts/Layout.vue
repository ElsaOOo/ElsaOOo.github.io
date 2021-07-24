<template>
  <div class="global-layout">
    <header class="page-header">
      <div class="datetime">
        <span>login: {{datetime}}</span>
        <a href="/about-me" class="about-me">关于我</a>
      </div>
      <div class="input">
        <div class="block-1"><img :src="macLogoPic" alt="mac.png" class="block-1-img"></div>
        <div class="block-2">
          <img :src="homeLogoPic" alt="home.png" class="block-2-img" @click="goToHome">
          <span class="path">{{currentPath}}</span>
        </div>
        <span class="angle"></span>
        <!-- <span class="command">ls</span> -->
      </div>
    </header>
    <div class="content-wrap theme-content">
     <Content />      
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useCurrentTime } from '../hooks/useCurrentTime';
import macLogo from './assets/mac.svg';
import homeLogo from './assets/home.svg';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { datetime } = useCurrentTime();
    const macLogoPic = macLogo;
    const homeLogoPic = homeLogo;

    const currentPath = computed(() => {
      if (route.path === '/') {
        return '~';
      }
      return `~${route.path}`
    })

    const goToHome = () => {
      router.push('/');
    }   
    return {
      datetime,
      macLogoPic,
      homeLogoPic,
      currentPath,
      goToHome
    }
  }
}
</script>

<style lang="less">
@import '../../styles/index.less';

.page-header {
  margin-top: 10px;
  .datetime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-right: 20px;
    .about-me {
      color: #fd971f;
    }
  }
  .input {
    height: 20px;
    line-height: 20px;
    display: flex;
  }
  .block-1 {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #607d8b;
    .block-1-img {
      height: 60%;
      width: 60%;
    }
  }
  .block-2 {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #40c4fe;
    padding-left: 10px;
    .block-2-img {
      height: 70%;
      // width: 70%;
      cursor: pointer;
      margin-right: 5px;
    }
    .path {
      color: #3c3c3c;
    }
    
  }
  .angle {
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 11px;
      border-color: transparent transparent transparent #40c4fe;
      margin-right: 10px;
    }
    .command {
       color: #a6e22e;
    }
}
a {
  color: #64fcda;
}
.content-wrap {
  padding: 0 20px 20px;
}
</style>