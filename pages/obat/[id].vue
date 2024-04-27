<template>
  <div>
    <div class="title"><NuxtLink to="/obat">Obat</NuxtLink> > Edit</div>
    <div class="container">
      <div class="detail">
        <div>Kode Obat: {{ form.kodeObat }}</div>
        <div>Nama Obat: {{ form.namaObat }}</div>
        <div>Tanggal Kadaluwarsa: {{ form.expiredDate }}</div>
        <div>Jumlah Stok Obat: {{ form.jumlah }}</div>
        <div>Harga Per Satuan: Rp. {{ form.harga }}</div>
      </div>
    </div>
    <form @submit.prevent="updateObat">
      <div class="input-group">
        <div class="input">
          <input type="text" v-model="form.kodeObat" placeholder=" " required>
          <label>Kode Obat</label>
        </div>
        <div class="input">
          <input v-model="form.namaObat" name="alamat" id="alamat" placeholder=" " required>
          <label>Nama Obat</label>
        </div>
        <div class="input">
          <input type="date" v-model="form.expiredDate" pattern="[0-9]{12}"  placeholder=" " required>
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
        <input v-else type="submit" value="Edit" class="submit edit">
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
const loading = ref(false)

const form = ref({
  kodeObat: '',
  namaObat: '',
  expiredDate: '',
  jumlah: '',
  harga: '',
})

async function setData() {
  try {
    loading.value = true
    const { data: obat, error } = await supabase.from('obat').select().eq('id', id).limit(1).single()
    if (error) throw error
    if (obat) {
      form.value.kodeObat = obat.kode_obat
      form.value.namaObat = obat.nama_obat
      form.value.expiredDate = obat.expired_date
      form.value.jumlah = obat.jumlah
      form.value.harga = obat.harga
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function updateObat() {
  try {
    loading.value = true
    const { error } = await supabase.from("obat").update({
      kode_obat: form.value.kodeObat,
      nama_obat: form.value.namaObat,
      expired_date: form.value.expiredDate,
      jumlah: form.value.jumlah,
      harga: form.value.harga
    }).eq('id', id)
    if (error) throw error
    else navigateTo("/obat")
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  setData()
})
</script>

<style scoped>
@import url("~/assets/css/main.css");
</style>