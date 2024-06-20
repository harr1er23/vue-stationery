<script setup>
import Item from './Item.vue'
import Search from './Search.vue'
import SelectFilter from './SelectFilter.vue'

defineProps({
  pageName: String,
  items: Array,
  onChangeSearchInput: Function,
  onChangeSelect: Function
})

const onClickAdd = () => {
  alert('Add to cart')
}

const onClickFavorite = () => {
  alert('Add to favorite')
}
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold mb-8">{{ pageName }}</h2>

      <div class="flex gap-4">
        <SelectFilter :onChangeSelect="onChangeSelect" />

        <Search :onChangeSearchInput="onChangeSearchInput" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-10">
      <Item
        v-for="item in items"
        :key="item.id"
        :image-url="item.mainPhoto"
        :name="item.name"
        :price="item.price"
        :is-added="true"
        :is-favorite="true"
        :onClickAdd="onClickAdd"
        :onClickFavorite="onClickFavorite"
      />
    </div>
  </div>
</template>
