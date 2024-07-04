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
import Pagination from '../components/Pagination.vue'

const stoks = inject('stoks')
const { items, totalItems, totalPages } = inject('items')
const isLoading = inject('isLoadingItems')
const category = inject('category')
const { cartItems } = inject('cart')
const filters = inject('filters')

const route = useRoute()

const fetchItems = async (categoryId) => {
  try {
    const params = {
      sortBy: filters.sortBy,
      page: filters.page,
      limit: filters.limit
    }

    const url = categoryId
      ? `https://6a17866731ff6fbf.mokky.dev/products/?type=${categoryId}`
      : 'https://6a17866731ff6fbf.mokky.dev/products'

    if (filters.searchQuery) {
      params.name = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(url, {
      params
    })

    items.value = data.items.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAddedToCart: false,
      favoriteId: null,
      cartCount: 0,
      cartItemId: null
    }))

    totalPages.value = data.meta.total_pages
    totalItems.value = data.meta.total_items
  } catch (err) {
    console.log(err)
  }
}

const fetchCartItems = async () => {
  try {
    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/cart')

    items.value = items.value.map((item) => {
      const inCart = data.find((favorite) => favorite.itemId === item.id)

      if (!inCart) {
        return item
      }

      return {
        ...item,
        cartCount: inCart.cartCount,
        isAddedToCart: true,
        cartItemId: inCart.id
      }
    })

    cartItems.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  isLoading.value = true
  await fetchItems(route.params.id)
  await fetchCartItems()
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

      <Pagination
        v-if="totalPages > 1"
        class="self-center mt-4"
        :totalIitems="totalItems"
        :currentPage="filters.page"
        :limit="filters.limit"
      />
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
