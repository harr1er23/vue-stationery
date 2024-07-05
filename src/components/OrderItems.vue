<script setup>
import OrderItem from './OrderItem.vue'

defineProps({
  orderItems: Array
})
</script>

<template>
  <div class="grid grid-cols-6">
    <OrderItem v-for="orderItem in orderItems" :key="orderItem.id" v-bind="orderItem" />
  </div>
</template>

<style scoped></style>
