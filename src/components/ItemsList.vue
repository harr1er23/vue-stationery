<script setup>
import axios from 'axios'

import Item from './Item.vue'

defineProps({
  pageName: String,
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
  <div class="grid grid-cols-4 gap-4 mt-10">
    <Item
      v-for="item in items"
      :onClickFavorite="() => onClickFavorite(item)"
      :key="item.id"
      v-bind="item"
    />
  </div>
</template>
