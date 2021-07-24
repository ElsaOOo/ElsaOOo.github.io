import { defineClientAppEnhance } from '@vuepress/client'
import RenderRouterView from './components/RenderRouterView.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('RenderRouterView', RenderRouterView)
})