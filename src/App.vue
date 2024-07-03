<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import ItemsList from './components/ItemsList.vue'
// import Carousel from './components/Carousel.vue'
import ItemsSkeleton from './components/ItemsSkeleton.vue'
import Search from './components/Search.vue'
import SelectFilter from './components/SelectFilter.vue'
// import BannerSkeleton from './components/BannerSkeleton.vue'
import StoksList from './components/StoksList.vue'
import ParametersList from './components/ParametersList.vue'
import Drawer from './components/Drawer.vue'
// import Pagination from './components/Pagination.vue'

const items = ref([])
const cartItems = ref([])

const stoks = ref([])
const parameters = ref([])

const totalItems = ref(null)
const showDrawer = ref(false)

const isLoading = ref(true)

const isCreatingOrder = ref(false)

const filters = reactive({
  sortBy: 'name',
  searchQuery: '',
  page: 1,
  limit: 16
})

const cartSum = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.cartCount, 0)
)

const cartIsEmpty = computed(() => cartItems.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

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
      // page: filters.page,
      // limit: filters.limit
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

    totalItems.value = data
    // totalItems.value = data.meta.total_items
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

const openDrawer = () => {
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
}

const deleteItemFromCart = async (id) => {
  await axios.delete(`https://6a17866731ff6fbf.mokky.dev/cart/${id}`)
  items.value = items.value.map((item) => {
    const findItem = items.value.find((obj) => obj.cartItemId === id)

    if (!findItem) {
      return item
    }

    return {
      ...item,
      cartCount: 0,
      isAddedToCart: false
    }
  })

  cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== id)
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://6a17866731ff6fbf.mokky.dev/orders`, {
      items: cartItems.value,
      totalPrice: cartSum.value
    })

    for (const obj of cartItems.value) {
      await new Promise((resolve) => {
        setTimeout(async () => {
          await deleteItemFromCart(obj.id)
          resolve()
        }, 100)
      })
    }

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const reduceCartArrayAmount = (id) => {
  cartItems.value = cartItems.value.map((cartItem) => {
    if (cartItem.id !== id) {
      return cartItem
    }

    return {
      ...cartItem,
      cartCount: cartItem.cartCount - 1
    }
  })
}

const reduceItemArrayAmount = (id) => {
  items.value = items.value.map((item) => {
    if (item.cartItemId !== id) {
      return item
    }

    return {
      ...item,
      cartCount: item.cartCount - 1
    }
  })
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
watch(cartItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAddedToCart: false
  }))
})

provide('items', items)
provide('onChangeSelect', onChangeSelect)
provide('onChangeSearchInput', onChangeSearchInput)
provide('isLoadingItems', isLoading)
provide('cart', {
  cartItems,
  closeDrawer,
  openDrawer,
  deleteItemFromCart,
  cartSum,
  createOrder,
  cartButtonDisabled,
  reduceCartArrayAmount,
  reduceItemArrayAmount
})
</script>

<template>
  <Drawer v-if="showDrawer" />
  <div class="mx-24 m-auto rounded-xl">
    <Header @open-drawer="openDrawer" :cart-sum="cartSum" />

    <div class="flex">
      <ParametersList :parameters="parameters" />

      <main class="content fixed rounded-xl shadow-xl p-8 mt-28 bg-white overflow-hidden">
        <div class="flex flex-col scroll-container overflow-y-auto h-full">
          <!-- <Carousel v-if="!isLoading" /> -->
          <!-- <BannerSkeleton v-else /> -->

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

          <!--<Pagination
            class="self-center mt-4"
            :totalIitems="totalItems"
            :currentPage="filters.page"
            :limit="filters.limit"
          />-->
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
