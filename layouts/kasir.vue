<template>
  <div>
    <Navbar>
      <div>{{ username.username }}</div>
    </Navbar>
    <slot />
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { data: username, error } = await supabase.from('users').select('username').eq('id', user.value.id).limit(1).single()
if (error) throw error
</script>

<style scoped>

</style>