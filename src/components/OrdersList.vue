<script setup>
import OrderItems from './OrderItems.vue'

defineProps({
  ordersList: Array
})
</script>

<template>
  <div class="my-4" v-for="order in ordersList" :key="order.id">
    <div class="flex ml-2">
      <b> #{{ order.uid }} </b>
      <img class="w-6" v-if="order.status === 'wait'" src="/time.png" alt="Status" />
      <img class="w-6" v-if="order.status === 'delivery'" src="/delivery.png" alt="Status" />
      <img class="w-6" v-if="order.status === 'received'" src="/success.png" alt="Status" />
    </div>
    <p class="ml-6">
      Дата: <b> {{ order.date }} </b>
    </p>
    <p class="ml-6">
      Сумма: <b> {{ order.totalPrice }} </b>
    </p>

    <OrderItems :orderItems="order.items" />
  </div>
</template>

<style scoped></style>
