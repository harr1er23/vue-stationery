<script setup>
import Parameter from './Parameter.vue'

defineProps({
  parameters: Array
})
</script>

<template>
  <aside class="flex fixed rounded-xl shadow-xl p-8 mt-28 mr-10 flex-col bg-white">
    <Parameter
      v-for="parameter in parameters"
      :key="parameter.id"
      class="my-2 w-48"
      v-bind="parameter"
    />
  </aside>
</template>
