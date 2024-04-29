import PocketBase from "pocketbase"

async function newAdmin(config) {
  const pb = new PocketBase(config.public.apiBase)

  const { token } = await pb.admins.authWithPassword(
    config.adminEmail,
    config.adminPassword
  )

  pb.beforeSend = (url, options) => {
    options.headers = Object.assign({}, options.headers, {
      Authorization: token,
    })
    return { url, options }
  }

  return pb
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const config = useRuntimeConfig()
  const admin = await newAdmin(config)

  try {
    await admin
      .collection("users")
      .create({ email, password, passwordConfirm: password })
    await admin.collection("users").authWithPassword(email, password)
    await admin.collection("users").requestVerification(email)
  } catch (error) {
    const errors = {}
    const data = error.response.data
    Object.keys(data).forEach((key) => {
      errors[key] = data[key].message
    })
    return { errors }
  }

  return { errors: null }
})
