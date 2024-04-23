export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  if (user.value.user_metadata.tipe_user == "Admin") return

  if (user.value.user_metadata.tipe_user == "Apoteker") {
    if (to.name == "obat" || to.name == "resep") return
    else return navigateTo("/")
  }
  if (user.value.user_metadata.tipe_user == "Kasir") {
    if (to.name == "transaksi") return
    else return navigateTo("/")
  }
})