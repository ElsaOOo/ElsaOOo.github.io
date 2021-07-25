<template>
  <ClientOnly>
    <div class="global-layout">
      <header class="page-header">
        <div class="datetime">
          <span>login: {{ datetime }}</span>
          <router-link to="/about-me" class="about-me">关于我</router-link>
        </div>
        <div class="input">
          <div class="left">
            <div class="block-1">
              <img :src="macLogoPic" alt="mac.png" class="block-1-img" />
            </div>
            <div class="block-2">
              <img
                :src="homeLogoPic"
                alt="home.png"
                class="block-2-img"
                @click="goToHome"
              />
              <span class="path">{{ currentPath }}</span>
            </div>
            <span class="angle"></span>
          </div>
          <div class="right" @click="goBack" v-if="$route.path !== '/'">
            <span class="angle"></span>
            <div class="block-1">
              <span>back</span>
            </div>
          </div>
        </div>
      </header>
      <div class="content-wrap theme-content">
        <Content />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCurrentTime } from "../hooks/useCurrentTime";
import macLogo from "./assets/mac.svg";
import homeLogo from "./assets/home.svg";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { datetime } = useCurrentTime();
    const macLogoPic = macLogo;
    const homeLogoPic = homeLogo;

    const currentPath = computed(() => {
      if (route.path === "/") {
        return "~";
      }
      return `~${route.path}`;
    });

    const goToHome = () => {
      router.push("/");
    };
    const goBack = () => {
      router.go(-1);
    };
    return {
      datetime,
      macLogoPic,
      homeLogoPic,
      currentPath,
      goToHome,
      goBack,
    };
  },
};
</script>

<style lang="less">
@import "../../styles/index.less";

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
    justify-content: space-between;
    .left {
      display: flex;
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
    }
    .right {
      display: flex;
      cursor: pointer;
      .angle {
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 12px 10px 0;
        border-color: transparent #e4e72c transparent transparent;
      }
      .block-1 {
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e4e72c;
        color: #795548;
      }
    }
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
