<template>
  <div>
    <h3>Kelola User</h3>
    <form @submit.prevent="signUp">
      <div class="input-group">
        <div class="input">
          <select v-model="tipeUser" :class="{ selected: tipeUser }" required>
            <option disabled value="">Tipe User</option>
            <option>Admin</option>
            <option>Apoteker</option>
            <option>Kasir</option>
          </select>
        </div>
        <div class="input">
          <input type="text" v-model="namaUser" placeholder=" " required>
          <label>Nama</label>
        </div>
        <div class="input">
          <input v-model="alamat" name="alamat" id="alamat" placeholder=" " required>
          <label>Alamat</label>
        </div>
        <div class="input">
          <input type="tel" v-model="telpon" pattern="[0-9]{12}"  placeholder=" " required>
          <label>Telpon (contoh: 081234567890)</label>
        </div>
        <div class="input">
          <input type="text" v-model="username" placeholder=" " required>
          <label>Username</label>
        </div>
        <div class="input">
          <input type="email" v-model="email" placeholder=" " required>
          <label>Email</label>
        </div>
        <div class="input">
          <input type="text" v-model="password" placeholder=" " required>
          <label>Password</label>
        </div>
      </div>
      <div class="container">
        <input type="submit" value="Tambah" class="submit">
      </div>
    </form>
    <div class="container">
      <table>
        <caption>Users</caption>
        <thead>
          <tr>
            <td></td>
            <td>Tipe User</td>
            <td>Nama</td>
            <td>Alamat</td>
            <td>Telpon</td>
            <td>Username</td>
            <td>Email</td>
            <td>Password</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.tipe_user }}</td>
            <td>{{ user.nama_user }}</td>
            <td>{{ user.alamat }}</td>
            <td>{{ user.telpon }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td>
              <button class="btn-icon"><img src="~/assets/img/edit.png" alt="Edit"></button>
              <button class="btn-icon"><img src="~/assets/img/delete.png" alt="Delete"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: users } = useAsyncData('users', async () => {
  const { data } = await supabase.from('users').select()
  return data
})

const tipeUser = ref('')
const namaUser = ref('')
const alamat = ref('')
const telpon = ref('')
const username = ref('')
const email = ref('')
const password = ref('')

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        tipe_user: tipeUser.value,
        nama_user: namaUser.value,
        alamat: alamat.value,
        telpon: telpon.value,
        username: username.value
      }
    }
  })
  if (error) throw error
  if (data) {
    insertUser(data)
  }
}

async function insertUser(userData) {
  const { data, error } = await supabase.from('users').insert({
    id: userData.user.id,
    tipe_user: tipeUser.value,
    nama_user: namaUser.value,
    alamat: alamat.value,
    telpon: telpon.value,
    username: username.value,
    email: email.value,
    password: password.value,
  })
  if (error) throw error
  if (data) {
    users.value = data
    relog()
  }
}

async function relog() {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    const { data, error } = await supabase.from('users').select('email, password').eq('id', user.value.id).limit(1).single()
    if (error) throw error
    if (data) {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })
      if (error) throw error
      else navigateTo('/users')
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>