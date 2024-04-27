<template>
  <div>
    <div class="title">Transaksi</div>
    <div class="container">
      <NuxtLink class="card-link" to="/transaksi/resep">Resep</NuxtLink>
      <NuxtLink class="card-link" to="/transaksi/nonresep">Non Resep</NuxtLink>
    </div>
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
.card-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 120px;
  margin: 30px;
  background: linear-gradient(to right bottom, #fff, #fafafa);
  color: #091d00;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(37, 41, 34, 0.15);
  cursor: pointer;
  transition: .5s;
}
.card-link:hover {
  scale: 1.1;
}
</style>