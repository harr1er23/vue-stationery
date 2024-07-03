<script setup>
import { ref } from 'vue'

defineProps({
  id: Number,
  name: String,
  url: String,
  sections: Array
})

const showItems = ref(false)

const onClickShowList = () => {
  showItems.value = !showItems.value
}
</script>

<template>
  <div>
    <div class="parameter flex cursor-pointer items-center" @click="onClickShowList">
      <div
        class="parameter-photo-bg flex justify-center p-2 items-center bg-slate-100 rounded-xl mr-4"
      >
        <img v-if="showItems === true" class="arrow w-6 h-6" src="/arrow-up.png" />
        <img v-else class="parameter-photo w-6 h-6" :src="url" alt="" />
      </div>
      <div class="font-medium text-slate-500">{{ name }}</div>
    </div>

    <div class="ml-14" v-for="section in sections" :key="section.type">
      <div class="my-2 cursor-pointer text-slate-500 hover:text-black" v-if="showItems">
        {{ section.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.parameter:hover .parameter-photo-bg {
  background-color: rgb(212 212 216);
}
</style>
