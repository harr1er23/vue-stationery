<script setup>
import OrderItem from './OrderItem.vue'

defineProps({
  orderItems: Array
})
</script>

<template>
  <div class="flex flex-wrap">
    <OrderItem v-for="orderItem in orderItems" :key="orderItem.id" v-bind="orderItem" />
  </div>
</template>

<style scoped></style>
