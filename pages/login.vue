<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="username" id="username" :disabled="loading" type="text" placeholder="Username" @input="checkUsername">
      <input v-model="password" id="password" :disabled="loading" type="password" placeholder="Password">
      <input type="submit" value="Login">
    </form>
    <div v-if="loading">Logging in...</div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const { data: users } = useAsyncData('users', async () => {
  const { data } = await supabase.from('users').select()
  return data
})

const loading = ref(false)
const username = ref('')
const password = ref('')

function checkUsername() {
  users.value.forEach(user => {
    if (user.username == username.value) {
      document.getElementById('password').focus()
    }
  })
}

async function login() {
  try {
    loading.value = true
    const { data, error } = await supabase.from('users').select('email').eq('username', username.value)
    if (error) throw error
    if (data) {
      const { error } = await supabase.auth.signInWithPassword({
        email: data[0].email,
        password: password.value
      })
      if (error) console.error(error)
      else navigateTo('/confirm')
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

<style>

</style>