import PocketBase from "pocketbase"

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const pb = new PocketBase(config.public.apiBase)

  const cookie = useCookie("pb_auth", {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: false, // change to "true" if you want only server-side access
    maxAge: 604800,
  })

  // load the store data from the cookie value
  pb.authStore.loadFromCookie(cookie.value || "")

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    cookie.value = pb.authStore.exportToCookie({ secure: false })
  })

  pb.afterSend = (response, data) => {
    if (response.status === 401) {
      pb.authStore.clear()
      navigateTo("/login")
    }
    return data
  }

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection("users").authRefresh())
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear()
  }

  return {
    provide: { pb },
  }
})
