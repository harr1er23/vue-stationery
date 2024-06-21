<script setup>
defineProps({
  id: Number,
  url: String,
  description: String
})
</script>

<template>
  <div class="relative cursor-pointer">
    <div class="absolute top-5 left-5">{{ description }}</div>
    <img :src="url" alt="Item" class="w-80 self-center rounded-3xl" />
  </div>
</template>
