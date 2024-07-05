<script setup>
import { defineComponent } from 'vue'
import { ContentLoader } from 'vue-content-loader'

defineComponent({
  components: { ContentLoader }
})
</script>

<template>
  <content-loader viewBox="0 0 35 25" :speed="2" primaryColor="#f3f3f3" secondaryColor="#dbdbdb">
    <rect x="0" y="0" rx="5" ry="5" width="35" height="25" />
  </content-loader>
</template>
