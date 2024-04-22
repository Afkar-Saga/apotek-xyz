export async function signOut() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const userId = user.value.id
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    else {
      const { error } = await supabase.from('log').insert({
        aktivitas: 'Logout',
        id_user: userId
      })
      if (error) throw error
    }
  } catch (error) {
    console.error(error)
  } finally {
    navigateTo('/login')
  }
}