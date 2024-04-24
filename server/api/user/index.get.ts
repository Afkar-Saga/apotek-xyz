import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const supabaseAdmin = serverSupabaseServiceRole(event)
  
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()
  if (error) throw error

  return users
})