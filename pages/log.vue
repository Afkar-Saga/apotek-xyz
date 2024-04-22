<template>
  <div>
    <table>
      <caption>Log Activity</caption>
      <thead>
        <tr>
          <td></td>
          <td>Waktu</td>
          <td>Username</td>
          <td>Aktivitas</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in logActivity" :key="activity.id">
          <td>{{ index + 1 }}</td>
          <td>{{ activity.waktu.split('.')[0].replace('T', ' ') }}</td>
          <td>{{ activity.users.username }}</td>
          <td>{{ activity.aktivitas }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()

const { data: logActivity } = useAsyncData('log', async () => {
  const { data } = await supabase.from('log').select(`
    *,
    users ( username )
  `)
  return data
})
</script>

<style scoped>

</style>