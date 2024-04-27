<template>
  <div class="sidenav">
    <div class="brand">
      <img src="~/assets/img/logo_apotek.png" alt="Logo Apotek">
      <span>Apotek XYZ</span>
    </div>
    <div class="nav">
      <slot></slot>
      <button @click="signOut()">Logout</button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function signOut() {
  try {
    const { error } = await supabase.from('log').insert({
      aktivitas: 'Logout',
      id_user: user.value.id
    })
    if (error) throw error
    else {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    }
  } catch (error) {
    console.error(error.message)
  } finally {
    navigateTo('/login')
  }
}
</script>

<style scoped>
.sidenav {
  height: 100%;
  background: linear-gradient(to right bottom, #090, #007d00);
  color: white;
  box-shadow: 2px 0 5px 5px rgba(0, 0, 0, 0.25);
  flex: 1 0 14%;
}
.brand {
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #777;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 24px;
}
.brand img {
  width: 50px;
}
.brand span {
  margin-left: 10px;
}
.nav {
  padding: 24px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
button {
  background: none;
  border: none;
  color: #aaa;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  color: red;
}
</style>