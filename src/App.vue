<script setup>
import { onMounted, ref, watch, reactive, provide } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import ItemsList from './components/ItemsList.vue'
import Carousel from './components/Carousel.vue'
import ItemsSkeleton from './components/ItemsSkeleton.vue'
import Search from './components/Search.vue'
import SelectFilter from './components/SelectFilter.vue'
import BannerSkeleton from './components/BannerSkeleton.vue'
// import Drawer from "./components/Drawer.vue";

const items = ref([])

const isLoading = ref(false)

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.name = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/products', {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchFavoriteItems = async () => {
  try {
    const { data: favorites } = await axios.get('https://6a17866731ff6fbf.mokky.dev/favorite')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.itemId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })

    console.log(items.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  isLoading.value = true
  await fetchItems()
  await fetchFavoriteItems()
  isLoading.value = false
})

watch(filters, fetchItems)

provide('onChangeSelect', onChangeSelect)
provide('onChangeSearchInput', onChangeSearchInput)
provide('isLoadingItems', isLoading)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <Carousel v-if="!isLoading" />
    <BannerSkeleton v-else />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все товары</h2>

        <div class="flex gap-4">
          <SelectFilter />

          <Search />
        </div>
      </div>
    </div>

    <ItemsList v-if="!isLoading" :items="items" />
    <ItemsSkeleton v-else />
  </div>
</template>

<style scoped></style>
