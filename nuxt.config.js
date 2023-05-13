import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Gourette - Location Appartement',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "Location d'un appartement de 35m² au pied des pistes à Gourette. Il est situé sur la plateforme du Valentin avec une superbe vue sur les pistes."
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Stéphane Chaigneau' },
      {
        name: "keywords",
        content: 'location gourette, location Gourette, Location gourette, Location Gourette, Location appartement gourette, Location appartement Gourette, location appartement Gourette, appartement gourette, appartement Gourette, Appartement Gourette'
      },
      { property: "og:title", content: "Gourette - Location Appartement" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://locationgourette.fr/" },
      { property: "og:site_name", content: "Gourette - Location Appartement" },
      {
        property: "og:description",
        content: "Location d'un appartement de 35m² au pied des pistes à Gourette. Il est situé sur la plateforme du Valentin avec une superbe vue pistes."
      },
      { property: "og:locale", content: "fr_FR" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/sitemap', { hostname: 'https://locationgourette.fr' }]
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

}
