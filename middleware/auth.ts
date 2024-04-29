export default defineNuxtRouteMiddleware((to) => {
  const app = useNuxtApp()
  const cookie = useCookie("pb_auth")

  app.$pb.authStore.loadFromCookie(cookie.value || "")

  const valid = app.$pb.authStore.isValid

  if (valid && to.path === "/login") {
    return navigateTo("/dashboard", { redirectCode: 401 })
  }

  if (!valid && to.path !== "/login") {
    return navigateTo("/login", { redirectCode: 401 })
  }
})
