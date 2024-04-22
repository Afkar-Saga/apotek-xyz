<template>
  <div>
    <Navbar>
      <h3>{{ username.username }}</h3>
      <NuxtLink to="/log" :class="{ active: route.name == 'log' }">Log Activity</NuxtLink>
      <NuxtLink to="/users" :class="{ active: route.name == 'users' }">Kelola User</NuxtLink>
      <NuxtLink to="/obat" :class="{ active: route.name == 'obat' }">Kelola Obat</NuxtLink>
      <NuxtLink to="/resep" :class="{ active: route.name == 'resep' }">Kelola Resep</NuxtLink>
      <NuxtLink to="/transaksi" :class="{ active: route.name == 'transaksi' }">Transaksi</NuxtLink>
      <NuxtLink to="/laporan" :class="{ active: route.name == 'laporan' }">Laporan</NuxtLink>
    </Navbar>
    <div class="main">
      <slot />
    </div>
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
.main {
  margin-left: 260px;
  padding: 75px 69px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
a {
  width: 100%;
  height: 50px;
  color: black;
  font-family: sans-serif;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  border-radius: 10px;
  transition: 0.3s;
}
a:hover {
  background-color: #e0e0e0;
}
a.active {
  color: #009900;
  font-weight: bold;
}
</style>