<template>
  <div>
    <div class="title"><NuxtLink to="/obat">Obat</NuxtLink> > Tambah </div>
    <form @submit.prevent="insertObat">
      <div class="input-group">
        <div class="input">
          <input type="text" v-model="form.kodeObat" placeholder=" " required>
          <label>Kode Obat</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.namaObat" placeholder=" " required>
          <label>Nama Obat</label>
        </div>
        <div class="input">
          <input type="date" v-model="form.expiredDate" placeholder=" " required>
          <label>Expired Date</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.jumlah" placeholder=" " required>
          <label>Jumlah</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.harga" placeholder=" " required>
          <label>Harga</label>
        </div>
      </div>
      <div class="container">
        <Loader v-if="loading" />
        <input v-else type="submit" value="Tambah" class="submit">
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()

const form = ref({
  kodeObat: '',
  namaObat: '',
  expiredDate: '',
  jumlah: '',
  harga: '',
})
const loading = ref(false)

async function insertObat() {
  try {
    loading.value = true
    const { error } = await supabase.from('obat').insert({
      kode_obat: form.value.kodeObat,
      nama_obat: form.value.namaObat,
      expired_date: form.value.expiredDate,
      jumlah: form.value.jumlah,
      harga: form.value.harga
    })
    if (error) throw error
    else {
      alert('Berhasil menambahkan obat')
      navigateTo('/obat')
    }
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>