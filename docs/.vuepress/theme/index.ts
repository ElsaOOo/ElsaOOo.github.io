const path = require('path');

const myTheme = (options, app) => {
  return {
    name: 'vuepress-theme-kuikui',
    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      404: path.resolve(__dirname, 'layouts/404.vue'),
    },
  }
}

export default myTheme