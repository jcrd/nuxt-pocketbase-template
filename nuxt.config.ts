// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "",
    },
    adminEmail: "",
    adminPassword: "",
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt"],
  formkit: {
    autoImport: true,
  },
})
