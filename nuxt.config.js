export default {
  mode: 'universal',

  srcDir: 'app',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: ['~assets/sass/common.scss'],

  styleResources: {
    scss: ['@/assets/sass/variable.scss']
  },

  plugins: [
    '@/plugins/firebase',
    '@/plugins/cookie-storage',
    '@/plugins/vee-validate',
    '@/plugins/moment',
    '@/plugins/uniqStr'
  ],

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/style-resources', 'nuxt-fontawesome'],

  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },

    transpile: ['vee-validate/dist/rules'],

    extend(config, ctx) {}
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  }
}
