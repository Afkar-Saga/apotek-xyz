<template>
  <div>
    <Navbar>
      <div>{{ username.username }}</div>
      <NuxtLink to="/obat" :class="{ active: route.name == 'obat' }">Kelola Obat</NuxtLink>
      <NuxtLink to="/resep" :class="{ active: route.name == 'resep' }">Kelola Resep</NuxtLink>
    </Navbar>
    <slot />
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { data: username, error } = await supabase.from('users').select('username').eq('id', user.value.id).limit(1).single()
if (error) throw error
</script>

<style scoped>

</style>