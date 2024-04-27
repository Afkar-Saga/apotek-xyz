import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const supabaseAdmin = serverSupabaseServiceRole(event)
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(id!, {
    email: body.email,
    password: body.password,
    user_metadata: {
      tipe_user: body.tipe_user,
      nama_user: body.nama_user,
      alamat: body.alamat,
      telpon: body.telpon,
      username: body.username,
    },
    email_confirm: true
  })
  if (error) throw error
  return user
})