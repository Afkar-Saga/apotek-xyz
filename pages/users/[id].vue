<template>
  <div>
    <div class="title"><NuxtLink to="/users">User</NuxtLink> > Edit</div>
    <div class="container">
      <div class="detail">
        <div>Tipe User: {{ form.tipeUser }}</div>
        <div>Nama: {{ form.namaUser }}</div>
        <div>Alamat: {{ form.alamat }}</div>
        <div>Telpon: {{ form.telpon }}</div>
        <div>Username: {{ form.username }}</div>
        <div>Email: {{ form.email }}</div>
        <div>Password: {{ form.password }}</div>
      </div>
    </div>
    <form @submit.prevent="updateUser">
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
        <input v-else type="submit" value="Edit" class="submit edit">
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const { id } = useRoute().params
const supabase = useSupabaseClient()

const form = ref({
  email: '',
  password: '',
  tipeUser: '',
  namaUser: '',
  alamat: '',
  telpon: '',
  username: '',
})
const loading = ref(false)

async function setData() {
  try {
    loading.value = true
    const { data: user, error } = await supabase.from('users').select().eq('id', id).limit(1).single()
    if (error) throw error
    if (user) {
      form.value.email = user.email
      form.value.password = user.password
      form.value.tipeUser = user.tipe_user
      form.value.namaUser = user.nama_user
      form.value.alamat = user.alamat
      form.value.telpon = user.telpon
      form.value.username = user.username
    }
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

async function updateUser() {
  try {
    loading.value = true
    const data = await $fetch(`/api/user/${id}`, {
      method: 'PUT',
      body: {
        email: form.value.email,
        tipe_user: form.value.tipeUser,
        nama_user: form.value.namaUser,
        alamat: form.value.alamat,
        telpon: form.value.telpon,
        username: form.value.username,
        password: form.value.password
      }
    })
    const { error } = await supabase.from('users').update({
      email: form.value.email,
        tipe_user: form.value.tipeUser,
        nama_user: form.value.namaUser,
        alamat: form.value.alamat,
        telpon: form.value.telpon,
        username: form.value.username,
        password: form.value.password
    }).eq('id', id)
    if (error) throw error
    if (data && !error) navigateTo('/users')
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  setData()
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>