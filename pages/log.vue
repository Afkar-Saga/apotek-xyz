<template>
  <div>
    <div class="title">Log Activity</div>
    <div class="table">
      <table>
        <caption>Log Activity</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Waktu</th>
            <th>Aktivitas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pending">
            <td class="loader" colspan="4"><Loader /></td>
          </tr>
          <tr v-else v-for="(activity, index) in logActivity" :key="activity.id">
            <th>{{ index + 1 }}</th>
            <td>{{ activity.users.username }}</td>
            <td>{{ activity.waktu.split('.')[0].replace('T', ' ') }}</td>
            <td>{{ activity.aktivitas }}</td>
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

const { data: logActivity, pending } = useAsyncData('log', async () => {
  const { data } = await supabase.from('log').select(`
    *,
    users ( username )
  `).order('id', { ascending: false })
  return data
})
</script>

<style scoped>
@import url('/assets/css/main.css');
</style>