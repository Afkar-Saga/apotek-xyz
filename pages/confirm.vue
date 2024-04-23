<template>
  <div>
    Checking user type...
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<style>

</style>