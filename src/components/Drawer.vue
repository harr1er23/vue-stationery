<script setup>
import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
import CartInfo from './CartInfo.vue'
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"></div>
  <div class="bg-white w-3/12 h-full fixed right-0 top-0 z-30 p-8">
    <DrawerHeader />

    <CartItemList />

    <CartInfo />
  </div>
</template>
