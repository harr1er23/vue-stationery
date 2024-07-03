<script setup>
import Parameter from './Parameter.vue'

defineProps({
  parameters: Array
})
</script>

<template>
  <aside
    class="container overflow-y-scroll flex fixed rounded-xl shadow-xl p-6 mt-28 mr-10 flex-col bg-white"
  >
    <Parameter
      v-for="parameter in parameters"
      :key="parameter.id"
      class="my-2 w-48"
      v-bind="parameter"
    />
  </aside>
</template>

<style scoped>
.container {
  width: 14% !important;
  height: 85%;
}

.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(240, 240, 240, 0.842);
}

.container::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 5px;
}

.container::-webkit-scrollbar-thumb:hover {
  background: #c7c7c7;
}
</style>
