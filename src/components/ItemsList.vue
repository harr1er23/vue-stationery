<script setup>
import axios from 'axios'

import Item from './Item.vue'
import { inject } from 'vue'

defineProps({
  items: Array
})

const { cartItems, reduceCartArrayAmount } = inject('cart')

const onClickFavorite = (item) => {
  if (!item.isFavorite) {
    addToFavorite(item)
  } else {
    deleteFromFavorite(item)
  }
  item.isFavorite = !item.isFavorite
}

const addToCart = async (item) => {
  try {
    const { data } = await axios.post('https://6a17866731ff6fbf.mokky.dev/cart', {
      itemId: item.id,
      cartCount: 1,
      mainPhoto: item.mainPhoto,
      name: item.name,
      price: item.price
    })

    cartItems.value.push({
      id: data.id,
      itemId: item.id,
      cartCount: 1,
      mainPhoto: item.mainPhoto,
      name: item.name,
      price: item.price
    })
    item.isAddedToCart = true
    item.cartCount = 1
    item.cartItemId = data.id
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
  try {
    const { data } = await axios.post('https://6a17866731ff6fbf.mokky.dev/favorite', {
      itemId: item.id
    })

    item.favoriteId = data.id
  } catch (err) {
    console.log(err)
  }
}

const deleteFromFavorite = async (item) => {
  try {
    await axios.delete(`https://6a17866731ff6fbf.mokky.dev/favorite/${item.favoriteId}`)
  } catch (err) {
    console.log(err)
  }
}

const onClickMinus = (item) => {
  if (item.cartCount - 1 > 0) {
    axios.patch(`https://6a17866731ff6fbf.mokky.dev/cart/${item.cartItemId}`, {
      cartCount: item.cartCount - 1
    })

    reduceCartArrayAmount(item.cartItemId)
  } else {
    axios.delete(`https://6a17866731ff6fbf.mokky.dev/cart/${item.cartItemId}`)
    item.isAddedToCart = false

    cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== item.cartItemId)
  }
  item.cartCount = item.cartCount - 1
}

const onClickPlus = (item) => {
  if (item.cartCount < 30) {
    axios.patch(`https://6a17866731ff6fbf.mokky.dev/cart/${item.cartItemId}`, {
      cartCount: item.cartCount + 1
    })

    item.cartCount = item.cartCount + 1
    cartItems.value = cartItems.value.map((obj) => {
      if (obj.id === item.cartItemId) {
        return {
          ...obj,
          cartCount: obj.cartCount + 1
        }
      }

      return obj
    })
  }
}
</script>

<template>
  <div class="grid grid-cols-4" v-auto-animate>
    <Item
      v-for="item in items"
      :onClickFavorite="() => onClickFavorite(item)"
      :onClickAddToCart="() => addToCart(item)"
      :minusProductCount="() => onClickMinus(item)"
      :plusProductCount="() => onClickPlus(item)"
      :key="item.id"
      v-bind="item"
      :count="1"
    />
  </div>
</template>
