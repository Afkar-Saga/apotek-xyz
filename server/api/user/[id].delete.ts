import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const supabaseAdmin = serverSupabaseServiceRole(event)
  const id = getRouterParam(event, "id")

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id!)
  if (error) throw error

  return data
})