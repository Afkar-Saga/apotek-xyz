<template>
  <div>
    <h3>Edit User</h3>
    <form @submit="updateUser">
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
        <input type="submit" value="Edit" class="submit">
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const route = useRoute()
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

async function setData() {
  const { user } = await $fetch(`/api/user/${route.params.id}`, {
    method: 'GET'
  })
  if (user) {
    const { data: { password }, error } = await supabase.from('users').select('password').eq('id', user.id).limit(1).single()
    if (error) throw error
    if (password) {
      form.value.email = user.email
      form.value.password = password
      form.value.tipeUser = user.user_metadata.tipe_user
      form.value.namaUser = user.user_metadata.nama_user
      form.value.alamat = user.user_metadata.alamat
      form.value.telpon = user.user_metadata.telpon
      form.value.username = user.user_metadata.username
    }
  }
}

async function updateUser() {
  const data = await $fetch(`/api/user/${route.params.id}`, {
    method: 'PUT',
    body: {
      email: form.value.email,
      tipe_user: form.value.tipeUser,
      nama_user: form.value.namaUser,
      alamat: form.value.alamat,
      telpon: form.value.telpon,
      username: form.value.username,
    }
  })
  if (data) navigateTo("/users")
}

onMounted(() => {
  setData()
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
.submit {
  background-color: #990;
}
.submit:hover {
  background-color: #770;
}
</style>