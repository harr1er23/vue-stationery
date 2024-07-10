<script setup>
import { onMounted, provide, ref } from 'vue'
import axios from 'axios'

import ItemsSkeleton from '../components/ItemsSkeleton.vue'
import FavoriteList from '../components/FavoriteList.vue'
import ClearPage from '../components/ClearPage.vue'

const favoriteList = ref([])

const isLoading = ref(false)

const fetchFavorite = async () => {
  const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/favorite')

  favoriteList.value = data
}

onMounted(async () => {
  isLoading.value = true
  await fetchFavorite()
  isLoading.value = false
})

provide('favoriteList', favoriteList)
</script>

<template>
  <main class="content bg-white rounded-xl shadow-lg px-10 py-6 p-4 mt-28 overflow-hidden">
    <div class="flex flex-col scroll-container overflow-y-auto h-full">
      <ItemsSkeleton v-if="isLoading" :count="12" />
      <ClearPage
        v-else-if="!favoriteList.length"
        title="Закладок нет :("
        description="Вы еще ничего не добавляли в закладки"
      />
      <FavoriteList v-else :items="favoriteList" />
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
