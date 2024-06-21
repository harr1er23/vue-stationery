<script setup>
import axios from 'axios'

import Item from './Item.vue'

defineProps({
  items: Array
})

const onClickFavorite = (item) => {
  if (!item.isFavorite) {
    addToFavorite(item)
  } else {
    deleteFromFavorite(item)
  }
  item.isFavorite = !item.isFavorite
}

const onClickAddToCart = async (item) => {
  try {
    const { data } = await axios.post('https://6a17866731ff6fbf.mokky.dev/cart', {
      itemId: item.id,
      cartCount: 1,
      url: item.mainPhoto,
      name: item.name,
      price: item.price
    })

    item.cartId = data.id
    item.cartCount = item.cartCount + 1
  } catch (err) {
    console.log(err)
  }
}

const onClickMinus = (item) => {
  console.log(item.cartCount)
  if (item.cartCount - 1 > 0) {
    axios.patch(`https://6a17866731ff6fbf.mokky.dev/cart/${item.cartId}`, {
      cartCount: item.cartCount - 1
    })
  } else {
    axios.delete(`https://6a17866731ff6fbf.mokky.dev/cart/${item.cartId}`)
  }
  item.cartCount = item.cartCount - 1
}

const onClickPlus = (item) => {
  if (item.cartCount < 30) {
    axios.patch(`https://6a17866731ff6fbf.mokky.dev/cart/${item.cartId}`, {
      cartCount: item.cartCount + 1
    })

    item.cartCount = item.cartCount + 1
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
</script>

<template>
  <div class="grid grid-cols-4 gap-4 mx-10">
    <Item
      v-for="item in items"
      :onClickFavorite="() => onClickFavorite(item)"
      :onClickAddToCart="() => onClickAddToCart(item)"
      :minusProductCount="() => onClickMinus(item)"
      :plusProductCount="() => onClickPlus(item)"
      :key="item.id"
      v-bind="item"
      :count="1"
    />
  </div>
</template>
