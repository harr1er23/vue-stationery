<script setup>
import { defineComponent } from 'vue'
import { ContentLoader } from 'vue-content-loader'

defineComponent({
  components: { ContentLoader }
})
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <content-loader
      v-for="skeleton in 12"
      :key="skeleton"
      class="w-72 m-2"
      viewBox="0 0 300 400"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#dbdbdb"
    >
      <rect x="318" y="136" rx="0" ry="0" width="0" height="1" />
      <rect x="0" y="0" rx="15" ry="15" width="300" height="400" />
    </content-loader>
  </div>
</template>
