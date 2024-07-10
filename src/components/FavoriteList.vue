<script setup>
import FavoriteItem from './FavoriteItem.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="grid grid-cols-5 gap-10">
    <FavoriteItem v-for="item in items" :key="item.id" v-bind="item" />
  </div>
</template>
