<script setup>
defineProps({
  cartCount: Number,
  id: Number,
  isAddedToCart: Boolean,
  mainPhoto: String,
  name: String,
  price: Number
})
</script>

<template>
  <div
    v-if="isAddedToCart === true"
    class="flex border items-center border-slate-100 p-4 rounded-xl gap-4"
  >
    <img class="w-16 h-16" :src="mainPhoto" alt="Item" />

    <div class="flex flex-col justify-between">
      <p>{{ name }}</p>

      <div class="flex flex-col justify-between mt-2">
        <b>{{ price }} руб.</b>
      </div>
    </div>

    <div class="flex ml-auto">
      <div class="flex rounded-xl items-center p-2 bg-slate-100 mr-4">
        <div @click="minusProductCount">
          <img class="w-6 cursor-pointer" src="/minus.svg" alt="Minus" />
        </div>

        <span class="mx-2">{{ cartCount }}</span>

        <div @click="plusProductCount">
          <img class="w-6 cursor-pointer" src="/plus.svg" alt="Plus" />
        </div>
      </div>

      <img
        class="opacity-40 hover:opacity-100 cursor-pointer transition"
        src="/close.svg"
        alt="Delete"
      />
    </div>
  </div>
</template>
