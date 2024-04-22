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
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 260px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
  overflow-x: hidden;
  box-shadow: 2px 0 5px 5px rgba(0, 0, 0, 0.25);
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
  color: #777;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  color: red;
}
</style>