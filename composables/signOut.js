export async function signOut() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  else {
    const { error } = await supabase.from('log').insert({
      aktivitas: 'Logout',
      id_user: user.value.id
    })
    if (error) throw error
    else navigateTo('/login')
  }
}