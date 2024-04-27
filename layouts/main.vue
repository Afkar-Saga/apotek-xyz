<template>
  <div>
    <div class="wrapper">
      <Navbar>
        <img src="~/assets/img/logo_admin.png" alt="Admin" v-if="tipe_user == 'Admin'">
        <img src="~/assets/img/logo_apoteker.png" alt="Apoteker" v-if="tipe_user == 'Apoteker'">
        <img src="~/assets/img/logo_kasir.png" alt="Kasir" v-if="tipe_user == 'Kasir'">
        <div class="username">{{ username }}</div>
        <NuxtLink v-if="tipe_user == 'Admin'" to="/log" :class="{ active: route.name.includes('log') }">Log Activity</NuxtLink>
        <NuxtLink v-if="tipe_user == 'Admin'" to="/users" :class="{ active: route.name.includes('users') }">Kelola User</NuxtLink>
        <NuxtLink v-if="['Admin', 'Apoteker'].includes(tipe_user)" to="/obat" :class="{ active: route.name.includes('obat') }">Kelola Obat</NuxtLink>
        <NuxtLink v-if="['Admin', 'Apoteker'].includes(tipe_user)" to="/resep" :class="{ active: route.name.includes('resep') }">Kelola Resep</NuxtLink>
        <NuxtLink v-if="['Admin', 'Kasir'].includes(tipe_user)" to="/transaksi" :class="{ active: route.name.includes('transaksi') }">Transaksi</NuxtLink>
        <NuxtLink v-if="tipe_user == 'Admin'" to="/laporan" :class="{ active: route.name.includes('laporan') }">Laporan</NuxtLink>
      </Navbar>
      <div class="main">
        <main class="content">
          <div class="card">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
// const { user_metadata: { username, tipe_user } } = user.value
const { data: { username, tipe_user }, error } = await supabase.from('users').select('username, tipe_user').eq('id', user.value.id).limit(1).single()
if (error) throw error
// const { data: loggedUser } = await supabase.from('users').select('username, tipe_user').eq('id', user.value.id).limit(1).single()
// const url = computed(() => {
//   return new URL(`../assets/img/bg-${loggedUser.tipe_user.toLowerCase()}.png`, import.meta.url).href
// })
// const background = computed(() => {
//   return `url(${url.value})`
// })
</script>

<style scoped>
@import url('~/assets/css/main.css');
div:has(.wrapper) {
  overflow: hidden;
  height: 100vh;
}
.wrapper {
  display: flex;
  /* background-image: v-bind(background); */
  background-color: #f7fbf5;
  height: 100%;
}
@media (max-width: 500px) {
  .wrapper {
    flex-direction: column;
  }
}
.main {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
}
.content {
  padding: 3rem;
  max-width: 100vw;
  width: 100%;
  flex: 1;
}
.card {
  padding: 18px 32px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(37, 41, 34, 0.05);
}
.username {
  font-size: 24px;
}
a {
  width: 100%;
  height: 50px;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  border-radius: 10px;
  transition: 0.3s;
}
a:hover {
  background-color: #03600b;
}
a.active {
  color: #96ff96;
  font-weight: bold;
}
</style>