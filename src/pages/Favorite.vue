<script setup>
import ItemsSkeleton from '../components/ItemsSkeleton.vue'
import FavoriteList from '../components/FavoriteList.vue'
import { inject } from 'vue'

const isLoading = inject('isLoadingItems')
</script>

<template>
  <main class="content rounded-xl shadow-xl p-4 mt-28 bg-white overflow-hidden">
    <div class="flex flex-col scroll-container overflow-y-auto h-full">
      <FavoriteList v-if="!isLoading" :items="items" />
      <ItemsSkeleton v-else :count="12" />
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
