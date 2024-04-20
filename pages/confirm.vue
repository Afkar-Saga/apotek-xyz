<template>
  <div>
    Checking user type...
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { data: loggedUser, error } = await supabase.from('users').select('tipe_user').eq('id', user.value.id).limit(1).single()
if (error) throw error

watch(user, () => {
  if (loggedUser.tipe_user == "Admin") {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<style>

</style>