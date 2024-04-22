<template>
  <div>
    <h3>Kelola User</h3>
    <form>
      <div class="input-group">
        <select v-model="tipeUser" :class="{ selected: tipeUser }">
          <option disabled value="">Tipe User</option>
          <option>Admin</option>
          <option>Apoteker</option>
          <option>Kasir</option>
        </select>
        <input type="text" v-model="namaUser" placeholder="Nama">
        <textarea v-model="alamat" name="alamat" id="alamat" placeholder="Alamat"></textarea>
        <input type="tel" v-model="telpon" placeholder="Telpon">
        <input type="text" v-model="username" placeholder="Username">
        <input type="email" v-model="email" placeholder="Email">
        <input type="text" v-model="password" placeholder="Password">
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
            <td>Edit, Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()

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
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>