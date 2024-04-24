import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const supabaseAdmin = serverSupabaseServiceRole(event)
  const body = await readBody(event)

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: body.email,
    password: body.password,
    user_metadata: {
      tipe_user: body.tipe_user,
      nama_user: body.nama_user,
      alamat: body.alamat,
      telpon: body.telpon,
      username: body.username
    }
  })
  if (error) throw error
  
  return data
})