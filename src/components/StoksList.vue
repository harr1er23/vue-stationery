<script setup>
import Stok from './Stok.vue'

defineProps({
  stoks: Array
})
</script>

<template>
  <div class="grid grid-cols-4 gap-4 mx-10">
    <Stok v-for="stok in stoks" :key="stok.id" v-bind="stok" />
  </div>
</template>
