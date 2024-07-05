<script setup>
import { inject } from 'vue'

import Parameter from './Parameter.vue'
import ParameterSkeleton from './ParameterSkeleton.vue'

const parameters = inject('parameters')
const isLoading = inject('isLoadingItems')
</script>

<template>
  <aside
    v-if="!isLoading"
    class="flex flex-col container rounded-xl shadow-xl py-2 px-4 mt-28 mr-4 bg-white overflow-hidden"
  >
    <Parameter
      v-for="parameter in parameters"
      :key="parameter.id"
      class="my-2 w-64"
      v-bind="parameter"
    />
  </aside>
  <ParameterSkeleton v-else :count="17" />
</template>

<style scoped>
.container {
  width: 19% !important;
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.container::-webkit-scrollbar {
  width: 4px;
}

.container::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 5px;
}

.container::-webkit-scrollbar-thumb:hover {
  background: #c7c7c7;
}
</style>
