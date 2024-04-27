<template>
  <div>
    <div class="title"><NuxtLink to="/resep">Resep</NuxtLink> > Edit</div>
    <form @submit.prevent="updateResep">
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
          <select v-model="input.id" :class="{ selected: input.id }" required>
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
        <div v-else class="input-group">
          <input type="submit" value="Edit" class="submit edit">
          <button type="button" class="submit delete" @click="showDeleteConfirmation = true">Delete</button>
          <DeleteConfirmation v-if="showDeleteConfirmation" @cancel="showDeleteConfirmation = false" @delete="deleteResep" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const { id } = useRoute().params
const supabase = useSupabaseClient()

const form = ref({
  noResep: '',
  tglResep: '',
  namaDokter: '',
  namaPasien: '',
  obat: [{
    id: '',
    jumlah_obat: 1
  }]
})
const loading = ref(false)
const showDeleteConfirmation = ref(false)

const tambahObat = () => {
  form.value.obat.push({
    id: '',
    jumlah_obat: 1
  })
}

const { data: obats } = useAsyncData('obat', async () => {
  const { data, error } = await supabase.from('obat').select('id, nama_obat')
  if (error) throw error
  return data
})

async function setData() {
  try {
    loading.value = true
    const { data: resep, error } = await supabase.from('pasien').select(`
      *,
      obat ( id ),
      resep ( jumlah_obat )
    `).eq('id', id).limit(1).single()
    if (error) throw error
    if (resep) {
      form.value.noResep = resep.no_resep,
      form.value.tglResep = resep.tgl_resep,
      form.value.namaDokter = resep.nama_dokter,
      form.value.namaPasien = resep.nama_pasien,
      form.value.obat = resep.obat.map((obat, index) => ({
        ...obat,
        ...resep.resep[index]
      }))
    }
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

async function updateResep() {
  try {
    loading.value = true
    const { data: pasien, error } = await supabase.from('pasien').update({
      no_resep: form.value.noResep,
      tgl_resep: form.value.tglResep,
      nama_dokter: form.value.namaDokter,
      nama_pasien: form.value.namaPasien
    }).eq('id', id).select().maybeSingle()
    if (error) throw error
    if (pasien) {
      const resep = []
      form.value.obat.forEach(obat => {
        resep.push({
          id_pasien: pasien.id,
          id_obat: obat.id,
          jumlah_obat: obat.jumlah_obat
        })
      })
      const { data, error } = await supabase.from('resep').upsert(resep, { onConflict: 'id_pasien, id_obat' }).select()
      if (error) throw error
      if (data) navigateTo('/resep')
    }
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

async function deleteResep() {
  const { error } = await supabase.from('pasien').delete().eq('id', id)
  if (error) throw error
  else navigateTo('/resep')
}

onMounted(() => {
  setData()
})
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