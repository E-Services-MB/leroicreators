// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/reset.css"],

  fonts: {
    assets: {
      // The baseURL where font files are served.
      prefix: "~/assets/fonts/",
    },
  },

  modules: ["@nuxt/image"],
});

