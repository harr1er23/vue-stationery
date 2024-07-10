<script setup>
defineProps({
  title: String,
  description: String
})
</script>

<template>
  <div class="flex flex-col items-center text-center m-auto">
    <img class="w-14" src="/emoji-2.png" alt="Smile" />
    <b>{{ title }}</b>
    <p>{{ description }}</p>
  </div>
</template>

<style></style>
