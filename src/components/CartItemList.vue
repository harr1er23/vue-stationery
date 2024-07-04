<script setup>
import { inject } from 'vue'
import { VueSpinner } from 'vue3-spinners'

import CartItem from './CartItem.vue'
import ClearDraw from './ClearDraw.vue'

const { cartItems, cartButtonDisabled } = inject('cart')
</script>

<template>
  <div class="container flex h-4/6 overflow-y-scroll flex flex-1 flex-col gap-4" v-auto-animate>
    <VueSpinner
      v-if="cartButtonDisabled && cartItems.length !== 0"
      class="self-center my-auto"
      size="30"
      color="green"
    />
    <ClearDraw v-if="cartItems.length === 0 && cartButtonDisabled" />
    <CartItem
      v-else-if="!cartButtonDisabled && cartItems.length !== 0"
      v-for="item in cartItems"
      :key="item.id"
      v-bind="item"
    />
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
