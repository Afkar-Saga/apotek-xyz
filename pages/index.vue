<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  else navigateTo('/login')
}
</script>

<style>

</style>