<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import ItemsSkeleton from '../components/ItemsSkeleton.vue'
import OrdersList from '../components/OrdersList.vue'

const ordersList = ref([])

const isLoading = ref(false)

const fetchOrders = async () => {
  const { data } = await axios.get(`https://6a17866731ff6fbf.mokky.dev/orders?sortBy=-id`)

  ordersList.value = data
}

onMounted(async () => {
  isLoading.value = true
  await fetchOrders()
  isLoading.value = false
})
</script>

<template>
  <main class="rounded-xl shadow-xl p-4 mt-28 bg-white overflow-hidden">
    <div class="flex flex-col scroll-container overflow-y-auto h-full">
      <ItemsSkeleton v-if="isLoading" :count="6" />
      <OrdersList v-else :ordersList="ordersList" />
    </div>
  </main>
</template>

<style scoped>
.content {
  width: 100%;
}

.scroll-container {
  height: calc(100vh - 170px);
  overflow-y: auto;
}
</style>
