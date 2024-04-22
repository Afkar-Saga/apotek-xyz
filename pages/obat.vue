<template>
  <div>
    <h3>Kelola Obat</h3>
    <form>
      <div class="input-group">
        <!-- <input type="text" v-model="kodeObat" placeholder="Kode Obat"> -->
        <label class="input">
          <input type="text" placeholder=" ">
          <span class="input-label">Kode Obat</span>
        </label>
        <input type="text" v-model="namaObat" placeholder="Nama Obat">
        <input type="date" v-model="expiredData" placeholder="Expired Data">
        <input type="text" v-model="jumlah" placeholder="Jumlah">
        <input type="text" v-model="harga" placeholder="Harga">
      </div>
      <div class="container">
        <input type="submit" value="Tambah" class="submit">
      </div>
    </form>
    <div class="container">
      <table>
        <caption>Obat</caption>
        <thead>
          <tr>
            <td></td>
            <td>Kode Obat</td>
            <td>Nama Obat</td>
            <td>Expired Date</td>
            <td>Jumlah</td>
            <td>Harga</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(obat, index) in obats" :key="obat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ obat.kode_obat }}</td>
            <td>{{ obat.nama_obat }}</td>
            <td>{{ obat.expired_date }}</td>
            <td>{{ obat.jumlah }}</td>
            <td>{{ obat.harga }}</td>
            <td>Edit, Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'apply-layout'
})

const supabase = useSupabaseClient()

const { data: obats } = useAsyncData('obat', async () => {
  const { data } = await supabase.from('obat').select()
  return data
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>