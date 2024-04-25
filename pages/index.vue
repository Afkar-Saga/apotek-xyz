<template>
  <div>
    <h2>Selamat Datang</h2>
    <h3>{{ user.user_metadata.nama_user }}</h3>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
</script>

<style scoped>

</style>