<template>
  <div>
    <div class="title">Resep</div>
    <div class="container">
      <Loader v-if="pending" />
      <div class="detail" v-else v-for="resep in reseps" :key="resep.id" @click="navigateTo(`resep/${resep.id}`)">
        <div>No Resep: {{ resep.no_resep }}</div>
        <div>Tanggal Resep: {{ resep.tgl_resep }}</div>
        <hr>
        <div>Nama Dokter: {{ resep.nama_dokter }}</div>
        <div>Nama Pasien: {{ resep.nama_pasien }}</div>
        <hr>
        <div v-for="(obat, index) in resep.obat" :key="obat.id">
          <div>{{ obat.nama_obat }}: {{ resep.resep[index].jumlah_obat }}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <NuxtLink to="/resep/tambah"><button class="submit">Tambah Resep</button></NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()

const { data: reseps, pending } = useAsyncData('resep', async () => {
  const { data, error } = await supabase.from('pasien').select(`
    *,
    obat ( nama_obat ),
    resep ( jumlah_obat )
  `).order('no_resep')
  if (error) throw error
  return data
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
.container:has(.detail) {
  justify-content: start;
  padding: 10px 0;
  gap: 15px;
}
.detail {
  padding: 10px;
  background-color: #fafafa;
  cursor: pointer;
  transition: .5s;
}
.detail:hover {
  background-color: #f0fcf0;
}
</style>