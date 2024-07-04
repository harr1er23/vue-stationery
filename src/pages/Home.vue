<script setup>
import { inject, onMounted, watch } from 'vue'

import ItemsList from '../components/ItemsList.vue'
// import Carousel from '../components/Carousel.vue'
import ItemsSkeleton from '../components/ItemsSkeleton.vue'
import Search from '../components/Search.vue'
import SelectFilter from '../components/SelectFilter.vue'
// import BannerSkeleton from '../components/BannerSkeleton.vue'
import StoksList from '../components/StoksList.vue'
import ParametersList from '../components/ParametersList.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
// import Pagination from './components/Pagination.vue'

const stoks = inject('stoks')
const items = inject('items')
const isLoading = inject('isLoadingItems')
const pageUrl = inject('pageUrl')
const category = inject('category')

console.log(pageUrl)

const route = useRoute()

const fetchItems = async (categoryId) => {
  const url = categoryId
    ? `https://6a17866731ff6fbf.mokky.dev/products/?type=${categoryId}`
    : 'https://6a17866731ff6fbf.mokky.dev/products'

  const { data } = await axios.get(url)
  items.value = data
}

onMounted(async () => {
  isLoading.value = true
  await fetchItems(route.params.id)
  isLoading.value = false
})

watch(
  () => route.params.id,
  async (newCategoryId) => {
    isLoading.value = true
    await fetchItems(newCategoryId)
    isLoading.value = false
  }
)
</script>

<template>
  <ParametersList />

  <main class="content fixed rounded-xl shadow-xl p-8 mt-28 bg-white overflow-hidden">
    <div class="flex flex-col scroll-container overflow-y-auto h-full">
      <!-- <Carousel v-if="!isLoading" /> -->
      <!-- <BannerSkeleton v-else /> -->

      <div v-if="category === 'Все товары'" class="pt-6 pl-10">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Акции</h2>
        </div>

        <StoksList v-if="!isLoading" :stoks="stoks" />
        <ItemsSkeleton v-else :count="4" />
      </div>

      <div class="p-10">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">{{ category }}</h2>
          <div class="flex gap-4">
            <SelectFilter />
            <Search />
          </div>
        </div>
      </div>

      <ItemsList v-if="!isLoading" :items="items" />
      <ItemsSkeleton v-else :count="4" />

      <!--<Pagination
      class="self-center mt-4"
      :totalIitems="totalItems"
      :currentPage="filters.page"
      :limit="filters.limit"
    />-->
    </div>
  </main>
</template>

<style scoped>
.content {
  width: 75%;
  margin-left: 270px;
}

.scroll-container {
  height: calc(100vh - 170px);
  overflow-y: auto;
}
</style>
