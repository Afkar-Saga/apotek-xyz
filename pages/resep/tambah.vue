<template>
  <div>
    <div class="title"><NuxtLink to="/resep">Resep</NuxtLink> > Tambah</div>
    <form @submit.prevent="insertResep">
      <div class="input-group">
        <div class="input">
          <input type="text" v-model="form.noResep" placeholder=" " required>
          <label>No Resep</label>
        </div>
        <div class="input">
          <input type="date" v-model="form.tglResep" placeholder=" " required>
          <label>Tanggal Resep</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.namaDokter" placeholder=" " required>
          <label>Nama Dokter</label>
        </div>
        <div class="input">
          <input type="text" v-model="form.namaPasien" placeholder=" " required>
          <label>Nama Pasien</label>
        </div>
      </div>
      <div class="input-group" v-for="(input, index) in form.obat" :key="index">
        <div class="input">
          <select v-model="input.id_obat" :class="{ selected: input.id_obat }" required>
            <option disabled value="">Pilih obat</option>
            <option v-for="obat in obats" :value="obat.id">{{ obat.nama_obat }}</option>
          </select>
        </div>
        <div class="input">
          <input type="number" v-model="input.jumlah_obat" placeholder=" " required>
          <label>Jumlah</label>
        </div>
      </div>
      <button type="button" class="submit add" @click="tambahObat">+ Tambah Obat</button>
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
  noResep: '',
  tglResep: '',
  namaDokter: '',
  namaPasien: '',
  obat: [{
    id_obat: '',
    jumlah_obat: 1
  }]
})
const loading = ref(false)

const tambahObat = () => {
  form.value.obat.push({
    id_obat: '',
    jumlah_obat: 1
  })
}

const { data: obats } = useAsyncData('obat', async () => {
  const { data, error } = await supabase.from('obat').select('id, nama_obat')
  if (error) throw error
  return data
})

async function insertResep() {
  try {
    loading.value = true
    const { data: pasien, error } = await supabase.from('pasien').insert({
      no_resep: form.value.noResep,
      tgl_resep: form.value.tglResep,
      nama_dokter: form.value.namaDokter,
      nama_pasien: form.value.namaPasien
    }).select().limit(1).single()
    if (error) throw error
    if (pasien) {
      const resep = []
      form.value.obat.forEach(obat => {
        resep.push({
          id_pasien: pasien.id,
          ...obat
        })
      })
      const { data, error } = await supabase.from('resep').insert(resep).select()
      if (error) throw error
      if (data) navigateTo('/resep')
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
.add {
  width: 200px;
  background: none;
  color: #090;
  border: 2px solid #090;
}
.add:hover {
  background-color: #afa;
}
</style>