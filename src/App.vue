<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const categoryUrl = window.location.href.split('/')[4]

const items = ref([])
const cartItems = ref([])

const category = ref('Все товары')

const stoks = ref([])
const parameters = ref([])

const totalItems = ref(0)
const totalPages = ref(0)

const isLoading = ref(true)

const isCreatingOrder = ref(false)

const filters = reactive({
  searchQuery: '',
  page: 1,
  limit: 16
})

const isAuth = ref(true)

const cartDiscount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.cartCount * 0.05, 0)
)

const cartSum = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.cartCount, 0)
)

const totalPrice = computed(() => cartSum.value - cartDiscount.value.toFixed(0))

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
      type: route.params.id,
      page: filters.page,
      limit: filters.limit
    }

    const url = 'https://6a17866731ff6fbf.mokky.dev/products'

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

const fetchStoks = async () => {
  try {
    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/stoks')

    stoks.value = data
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
    const currentDate = new Date().toLocaleDateString('ru-RU')
    const uid = Math.floor(Date.now() / 1000)
      .toString()
      .slice(-6)

    isCreatingOrder.value = true
    const { data } = await axios.post(`https://6a17866731ff6fbf.mokky.dev/orders?sortBy=-id`, {
      items: cartItems.value,
      totalPrice: cartSum.value,
      uid,
      date: currentDate,
      status: 'wait'
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

const fetchData = async (categoryId) => {
  if (categoryId) {
    await fetchItems(categoryId)
  } else {
    await fetchItems()
  }
  await fetchFavoriteItems()
  await fetchStoks()
  await fetchParameters()
  await fetchCartItems()
}

onMounted(async () => {
  isLoading.value = true
  await fetchData()
  isLoading.value = false
})

watch(
  () => route.params.id,
  async () => {
    isLoading.value = true
    filters.page = 1
    await fetchData()
    isLoading.value = false
  }
)

watch(filters, async () => {
  isLoading.value = true
  await fetchData()
  isLoading.value = false
})

watch(cartItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAddedToCart: false
  }))
})

provide('filters', filters)
provide('parameters', parameters)
provide('stoks', stoks)
provide('items', {
  items,
  totalItems,
  totalPages
})
provide('onChangeSelect', onChangeSelect)
provide('onChangeSearchInput', onChangeSearchInput)
provide('isLoadingItems', isLoading)
provide('cart', {
  cartItems,
  deleteItemFromCart,
  cartSum,
  createOrder,
  cartButtonDisabled,
  reduceCartArrayAmount,
  reduceItemArrayAmount,
  cartDiscount,
  totalPrice
})
provide('categoryUrl', categoryUrl)
provide('category', category)
provide('userInfo', {
  isAuth,
  name: 'Alex',
  uid: '12131'
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
