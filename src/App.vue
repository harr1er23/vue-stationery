<script setup>
import { onMounted, ref, watch, reactive, provide } from 'vue'
import axios from 'axios'
import { Pagination } from 'vue3-carousel'

import Header from './components/Header.vue'
import ItemsList from './components/ItemsList.vue'
import Carousel from './components/Carousel.vue'
import ItemsSkeleton from './components/ItemsSkeleton.vue'
import Search from './components/Search.vue'
import SelectFilter from './components/SelectFilter.vue'
import BannerSkeleton from './components/BannerSkeleton.vue'
import StoksList from './components/StoksList.vue'
import ParametersList from './components/ParametersList.vue'
import Drawer from './components/Drawer.vue'

const cartSum = ref(0)
const items = ref([])
const stoks = ref([])
const parameters = ref([])
const showDrawer = ref(false)

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
      isAddedToCart: false,
      favoriteId: null,
      cartCount: 0,
      cartItemId: null
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchStoks = async () => {
  try {
    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/stoks')

    stoks.value = data
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
  } catch (err) {
    console.log(err)
  }
}

const fetchParameters = async () => {
  try {
    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/parameters')

    parameters.value = data
  } catch (err) {
    console.log(err)
  }
}

const fetchCartItems = async () => {
  try {
    const { data: cartItems } = await axios.get('https://6a17866731ff6fbf.mokky.dev/cart')

    items.value = items.value.map((item) => {
      const cartItem = cartItems.find((cartItem) => cartItem.itemId === item.id)

      if (!cartItem) {
        return item
      }

      return {
        ...item,
        isAddedToCart: true,
        cartId: cartItem.id,
        cartCount: cartItem.cartCount
      }
    })

    countSum()
  } catch (err) {
    console.log(err)
  }
}

const countSum = () => {
  const total = items.value
    .filter((obj) => obj.isAddedToCart)
    .reduce((sum, item) => sum + item.price * item.cartCount, 0)

  cartSum.value = total
}

onMounted(async () => {
  isLoading.value = true
  await fetchItems()
  await fetchFavoriteItems()
  await fetchStoks()
  await fetchParameters()
  await fetchCartItems()
  isLoading.value = false
})

watch(filters, fetchItems)

provide('onChangeSelect', onChangeSelect)
provide('onChangeSearchInput', onChangeSearchInput)
provide('isLoadingItems', isLoading)
provide('showDrawer', showDrawer)
provide('items', items)
provide('cartSum', cartSum)
</script>

<template>
  <Drawer v-if="showDrawer" />
  <div class="mx-24 m-auto rounded-xl">
    <Header />

    <div class="flex">
      <ParametersList :parameters="parameters" />

      <main class="content fixed rounded-xl shadow-xl p-8 mt-28 bg-white overflow-hidden">
        <div class="scroll-container overflow-y-auto h-full">
          <Carousel v-if="!isLoading" />
          <BannerSkeleton v-else />

          <div class="pt-6 pl-10">
            <div class="flex justify-between items-center">
              <h2 class="text-3xl font-bold mb-8">Акции</h2>
            </div>
          </div>

          <StoksList v-if="!isLoading" :stoks="stoks" />
          <ItemsSkeleton v-else :count="4" />

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
          <ItemsSkeleton v-else :count="4" />

          <Pagination class="mb-8" />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 75%;
  margin-left: 270px;
}

.scroll-container {
  height: calc(100vh - 170px); /* Adjust this value to account for header height */
  overflow-y: auto;
}
</style>
