<script setup>
import { inject } from 'vue'

const onChangeSearchInput = inject('onChangeSearchInput')
</script>

<template>
  <div class="relative">
    <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
    <input
      @input="onChangeSearchInput"
      type="text"
      class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
      placeholder="Поиск..."
    />
  </div>
</template>
