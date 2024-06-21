<script setup>
defineProps({
  id: Number,
  name: String,
  sections: Array
})
</script>

<template>
  <div>{{ name }}</div>
</template>
