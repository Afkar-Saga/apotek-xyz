export default defineNuxtRouteMiddleware((to) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  async function applyLayout() {
    const { data: loggedUser, error } = await supabase.from('users').select('tipe_user').eq('id', user.value.id).limit(1).single()
    if (error) throw error
    
    setPageLayout(loggedUser.tipe_user.toLowerCase())
  }
  
  applyLayout()
})