export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  if (user.value.user_metadata.tipe_user == "Admin") return

  if (user.value.user_metadata.tipe_user == "Apoteker") {
    if (['index', 'obat', 'resep'].some(route => to.name.includes(route))) return
    else return navigateTo("/")
  }
  if (user.value.user_metadata.tipe_user == "Kasir") {
    if (['index', 'transaksi'].some(route => to.name.includes(route))) return
    else return navigateTo("/")
  }
})