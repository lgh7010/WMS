let appEnv = undefined
appEnv = require('./env/env.js')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LKHDummyApi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: appEnv,

  server: {
    port: appEnv.PORT
  },
  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/base.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {

      }
    },
    extend (config, {isDev, isClient}) {
      if(isClient){
        config.node = {
          fs: "empty"
        }
      }
    }
  }
}
