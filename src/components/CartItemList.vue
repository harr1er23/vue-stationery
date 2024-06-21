<script setup>
import { inject, watch } from 'vue'
import CartItem from './CartItem.vue'

const items = inject('items')

watch(items)
</script>

<template>
  <div class="container flex h-4/6 overflow-y-scroll flex-1 flex-col gap-4 justify-between">
    <CartItem v-for="item in items" :key="item.id" v-bind="item" />
  </div>
</template>

<style scoped>
.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(240, 240, 240, 0.842);
}

.container::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 5px;
}

.container::-webkit-scrollbar-thumb:hover {
  background: #c7c7c7;
}
</style>
