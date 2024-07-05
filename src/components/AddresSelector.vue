<script setup>
// import { inject } from 'vue'

// const onChangeSelect = inject('onChangeSelect')
</script>

<template>
  <div class="w-1/6">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <input
        type="text"
        class="border rounded-md w-full py-2 pl-2 pr-4 outline-none focus:border-gray-400"
        placeholder="Адрес доставки"
      />
      <button
        class="text-white absolute end-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Поиск
      </button>
    </div>
  </div>
</template>
