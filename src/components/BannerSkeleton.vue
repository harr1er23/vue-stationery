<script setup>
import { defineComponent } from 'vue'
import { ContentLoader } from 'vue-content-loader'

defineComponent({
  components: { ContentLoader }
})
</script>

<template>
  <div class="flex px-24 py-24 justify-center">
    <content-loader
      viewBox="0 0 1000 400"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#dbdbdb"
      circle
      cx
    >
      <rect x="0" y="0" rx="10" ry="10" width="1000" height="350" />
    </content-loader>
  </div>
</template>
