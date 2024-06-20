<script setup>
import { inject } from 'vue'

const onChangeSelect = inject('onChangeSelect')
</script>

<template>
  <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none bg-white">
    <option value="name">По названию</option>
    <option value="price">По цене (дешевые)</option>
    <option value="-price">По цене (дорогие)</option>
  </select>
</template>
