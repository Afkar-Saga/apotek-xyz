<template>
  <div>
    <div class="wrapper">
      <Navbar>
        <img src="~/assets/img/logo_admin.png" alt="Admin" v-if="loggedUser.tipe_user == 'Admin'">
        <img src="~/assets/img/logo_apoteker.png" alt="Apoteker" v-if="loggedUser.tipe_user == 'Apoteker'">
        <img src="~/assets/img/logo_kasir.png" alt="Kasir" v-if="loggedUser.tipe_user == 'Kasir'">
        <div class="username">{{ loggedUser.username }}</div>
        <NuxtLink v-if="loggedUser.tipe_user == 'Admin'" to="/log" :class="{ active: route.name == 'log' }">Log Activity</NuxtLink>
        <NuxtLink v-if="loggedUser.tipe_user == 'Admin'" to="/users" :class="{ active: route.name == 'users' }">Kelola User</NuxtLink>
        <NuxtLink v-if="['Admin', 'Apoteker'].includes(loggedUser.tipe_user)" to="/obat" :class="{ active: route.name == 'obat' }">Kelola Obat</NuxtLink>
        <NuxtLink v-if="['Admin', 'Apoteker'].includes(loggedUser.tipe_user)" to="/resep" :class="{ active: route.name == 'resep' }">Kelola Resep</NuxtLink>
        <NuxtLink v-if="['Admin', 'Kasir'].includes(loggedUser.tipe_user)" to="/transaksi" :class="{ active: route.name == 'transaksi' }">Transaksi</NuxtLink>
        <NuxtLink v-if="loggedUser.tipe_user == 'Admin'" to="/laporan" :class="{ active: route.name == 'laporan' }">Laporan</NuxtLink>
      </Navbar>
      <div class="main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { data: loggedUser } = await supabase.from('users').select('username, tipe_user').eq('id', user.value.id).limit(1).single()
const url = computed(() => {
  return new URL(`../assets/img/bg-${loggedUser.tipe_user.toLowerCase()}.png`, import.meta.url).href
})
const background = computed(() => {
  return `url(${url.value})`
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
.wrapper {
  height: 100vh;
  background-image: v-bind(background);
  background-size: cover;
}
.username {
  font-size: 24px;
}
.main {
  width: 100%;
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