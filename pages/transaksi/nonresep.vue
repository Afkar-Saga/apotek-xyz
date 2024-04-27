<template>
  <div>
    <div class="title"><NuxtLink to="/transaksi">Transaksi</NuxtLink> > Non Resep</div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>