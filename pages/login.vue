<template>
  <div class="login-container">
    <div class="decor"></div>
    <form @submit.prevent="login" class="main">
      <h1>Apotek XYZ</h1>
      <img src="~/assets/img/logo_apotek.png" alt="Logo Apotek">
      <div>
        <div v-if="errorMessage">Username atau password salah</div>
        <div v-if="loading">Logging in...</div>
      </div>
      <div class="input">
        <input v-model="username" id="username" :disabled="loading" type="text" placeholder=" " @input="checkUsername" required>
        <label>Username: </label>
      </div>
      <div class="input">
        <input v-model="password" id="password" :disabled="loading" type="password" placeholder=" " required>
        <label>Password: </label>
      </div>
      <input type="submit" value="Login" class="submit">
    </form>
    <div class="decor"></div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// const { data: users } = useAsyncData('users', async () => {
//   const { data } = await supabase.from('users').select()
//   return data
// })

const { data: users } = useAsyncData('users', async () => {
  const data = await $fetch('/api/user', {
    method: 'GET'
  })
  return data
})

const errorMessage = ref(false)
const loading = ref(false)
const username = ref('')
const password = ref('')

function checkUsername() {
  users.value.forEach(user => {
    if (user.user_metadata.username == username.value) {
      document.getElementById('password').focus()
    }
  })
}

// function checkPassword() {
//   users.value.forEach(user => {
//     if (user.password == password.value) {
//       login()
//     }
//   })
// }

async function login() {
  try {
    loading.value = true
    const { data, error } = await supabase.from('users').select('id, email').eq('username', username.value)
    if (error) throw error
    if (data) {
      const { error } = await supabase.auth.signInWithPassword({
        email: data[0].email,
        password: password.value
      })
      if (error) {
        errorMessage.value = true
        console.error(error)
      }
      else {
        const { error } = await supabase.from('log').insert({
          aktivitas: 'Login',
          id_user: data[0].id
        })
        if (error) throw error
        else navigateTo('/confirm')
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  document.getElementById('username').focus()
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
.login-container {
  width: 1340px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-size: 80px;
  font-weight: lighter;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 45px;
}
.main .input {
  width: 100%;
}
.decor {
  width: 240px;
  height: 100%;
  background-color: #090;
}
</style>