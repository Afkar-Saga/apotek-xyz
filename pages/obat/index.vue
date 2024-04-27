<template>
  <div>
    <div class="title">Obat</div>
    <div class="table">
      <table>
        <caption>Obat</caption>
        <thead>
          <tr>
            <td>#</td>
            <td>Kode Obat</td>
            <td>Nama Obat</td>
            <td>Expired Date</td>
            <td>Jumlah</td>
            <td>Harga</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pending">
            <td colspan="7"><Loader /></td>
          </tr>
          <tr v-else v-for="(obat, index) in obats" :key="obat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ obat.kode_obat }}</td>
            <td>{{ obat.nama_obat }}</td>
            <td>{{ obat.expired_date }}</td>
            <td>{{ obat.jumlah }}</td>
            <td>{{ obat.harga }}</td>
            <td>
              <div class="btn-icon" @click="navigateTo(`/obat/${obat.id}`)">
                <img src="~/assets/img/edit.png" alt="Edit">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <NuxtLink to="/obat/tambah"><button class="submit">Tambah Obat</button></NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()

const { data: obats, pending } = useAsyncData('obat', async () => {
  const { data } = await supabase.from('obat').select()
  return data
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>