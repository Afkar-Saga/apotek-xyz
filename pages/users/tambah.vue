<template>
  <div>
    <div class="title"><NuxtLink to="/users">User</NuxtLink> > Tambah </div>
    <form @submit.prevent="createUser">
      <div class="input-group">
        <div class="input">
          <select v-model="form.tipeUser" :class="{ selected: form.tipeUser }" required>
            <option disabled value="">Tipe User</option>
            <option>Admin</option>
            <option>Apoteker</option>
            <option>Kasir</option>
          </select>
        </div>
        <div class="input">
          <input type="text" v-model="form.namaUser" placeholder=" " required>
          <label>Nama</label>
        </div>
        <div class="input">
          <input v-model="form.alamat" name="alamat" id="alamat" placeholder=" " required>
          <label>Alamat</label>
        </div>
        <div class="input">
          <input type="tel" v-model="form.telpon" pattern="[0-9]{12}"  placeholder=" " required>
          <label>Telpon (contoh: 081234567890)</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.username" placeholder=" " required>
          <label>Username</label>
        </div>
        <div class="input">
          <input type="email" v-model="form.email" placeholder=" " required>
          <label>Email</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.password" placeholder=" " required>
          <label>Password</label>
        </div>
      </div>
      <div class="container">
        <Loader v-if="loading" />
        <input v-else type="submit" value="Tambah" class="submit">
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()

const form = ref({
  tipeUser: '',
  namaUser: '',
  alamat: '',
  telpon: '',
  username: '',
  email: '',
  password: ''
})
const loading = ref(false)

async function createUser() {
  try {
    loading.value = true
    const data = await $fetch('/api/user', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
        tipe_user: form.value.tipeUser,
        nama_user: form.value.namaUser,
        alamat: form.value.alamat,
        telpon: form.value.telpon,
        username: form.value.username,
      }
    })
    if (data) insertUser(data.user)
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

async function insertUser(userData) {
  const { error } = await supabase.from('users').insert({
    id: userData.id,
    tipe_user: form.value.tipeUser,
    nama_user: form.value.namaUser,
    alamat: form.value.alamat,
    telpon: form.value.telpon,
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
  })
  if (error) throw error
  else {
    alert("Berhasil menambah user baru")
    navigateTo('/users')
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>