<template>
  <div>
    <h3>Kelola User</h3>
    <form @submit="createUser">
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
          <tr v-if="pending">
            <td colspan="9"><Loader /></td>
          </tr>
          <tr v-else v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.user_metadata.tipe_user }}</td>
            <td>{{ user.user_metadata.nama_user }}</td>
            <td>{{ user.user_metadata.alamat }}</td>
            <td>{{ user.user_metadata.telpon }}</td>
            <td>{{ user.user_metadata.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td>
              <div class="btn-icon">
                <NuxtLink :to="`/users/${user.id}`"><img src="~/assets/img/edit.png" alt="Edit"></NuxtLink>
              </div>
              <div class="btn-icon">
                <button @click="deleteUser(user.id)"><img src="~/assets/img/delete.png" alt="Delete"></button>
              </div>
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

const { data: users, pending, refresh } = useAsyncData('users', async () => {
  const [data, { data: passwords }] = await Promise.all([
    $fetch('/api/user', {
      method: 'GET'
    }),
    supabase.from('users').select('password')
  ])
  data.forEach((d, i) => d.password = passwords[i].password)
  return data
})

const form = ref({
  tipeUser: '',
  namaUser: '',
  alamat: '',
  telpon: '',
  username: '',
  email: '',
  password: ''
})

async function createUser() {
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
  insertUser(data.user)
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
    refresh()
  }
}

async function deleteUser(userId) {
  const data = await $fetch(`/api/user/${userId}`, {
    method: 'DELETE'
  })
  if (data) {
    console.log(data.user)
    alert("User berhasil di-delete")
    refresh()
  }
}

</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>