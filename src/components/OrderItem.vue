<script setup>
defineProps({
  id: Number,
  mainPhoto: String,
  name: String,
  price: Number
})
</script>

<template>
  <div
    class="flex my-4 mr-2 flex-col relative border border-slate-100 w-64 rounded-3xl cursor-pointer p-8 hover:-translate-y-2 hover:shadow-xl transition bg-white"
  >
    <img :src="mainPhoto" alt="Item" class="w-44 self-center" />

    <p class="mt-2">{{ name }}</p>

    <div class="flex justify-between mt-2">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
    </div>
  </div>
</template>
