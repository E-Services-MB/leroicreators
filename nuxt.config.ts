// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  hub: {
    db: {
      dialect: "sqlite",
      driver: "d1-http",
    },
  },
  fonts: {
    assets: {
      // The baseURL where font files are served.
      prefix: "~/assets/fonts/",
    },
  },

  modules: ["@nuxt/image", "@nuxt/ui", "@nuxthub/core", "nuxt-auth-utils"],
});
