<template>
  <div>
    <h3>Kelola Obat</h3>
    <form @submit.prevent="insertObat">
      <div class="input-group">
        <div class="input">
          <input type="text" v-model="kodeObat" placeholder=" " required>
          <label>Kode Obat</label>
        </div>
        <div class="input">
          <input type="text" v-model="namaObat" placeholder=" " required>
          <label>Nama Obat</label>
        </div>
        <div class="input">
          <input type="date" v-model="expiredDate" placeholder=" " required>
          <label>Expired Date</label>
        </div>
        <div class="input">
          <input type="text" v-model="jumlah" placeholder=" " required>
          <label>Jumlah</label>
        </div>
        <div class="input">
          <input type="text" v-model="harga" placeholder=" " required>
          <label>Harga</label>
        </div>
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
          <tr v-if="pending">
            <td colspan="7">Sedang mengambil data...</td>
          </tr>
          <tr v-else v-for="(obat, index) in obats" :key="obat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ obat.kode_obat }}</td>
            <td>{{ obat.nama_obat }}</td>
            <td>{{ obat.expired_date }}</td>
            <td>{{ obat.jumlah }}</td>
            <td>{{ obat.harga }}</td>
            <td>
              <button class="btn-icon"><img src="~/assets/img/edit.png" alt="Edit"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const supabase = useSupabaseClient()

const kodeObat = ref('')
const namaObat = ref('')
const expiredDate = ref('')
const jumlah = ref('')
const harga = ref('')

const { data: obats, pending, refresh } = useAsyncData('obat', async () => {
  const { data } = await supabase.from('obat').select()
  return data
})

async function insertObat() {
  const { error } = await supabase.from('obat').insert({
    kode_obat: kodeObat.value,
    nama_obat: namaObat.value,
    expired_date: expiredDate.value,
    jumlah: jumlah.value,
    harga: harga.value
  })
  if (error) throw error
  else refresh()
}
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>