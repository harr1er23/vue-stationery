<script setup>
import { inject } from 'vue'

import FavoriteItem from './FavoriteItem.vue'

const { items } = inject('items')
</script>

<template>
  <div class="grid grid-cols-5 gap-10" v-auto-animate>
    <FavoriteItem v-for="item in items" :key="item.id" v-bind="item" :count="1" />
  </div>
</template>
