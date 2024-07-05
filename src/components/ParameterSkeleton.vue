<script setup>
import { defineComponent } from 'vue'
import { ContentLoader } from 'vue-content-loader'

defineProps({
  count: Number
})

defineComponent({
  components: { ContentLoader }
})
</script>

<template>
  <div
    class="flex flex-col container rounded-xl shadow-xl py-2 px-4 mt-28 mr-4 bg-white overflow-hidden"
  >
    <content-loader
      class="my-2 w-64"
      v-for="skeleton in count"
      :key="skeleton"
      viewBox="0 0 300 40"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#dbdbdb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="40" height="40" />
      <rect x="56" y="0" rx="10" ry="10" width="220" height="40" />
    </content-loader>
  </div>
</template>
