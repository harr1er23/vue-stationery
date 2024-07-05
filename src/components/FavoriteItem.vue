<script setup>
defineProps({
  id: Number,
  mainPhoto: String,
  name: String,
  price: Number,
  isFavorite: Boolean,
  isAddedToCart: Boolean,
  favoriteId: Number,
  cartCount: Number
})
</script>

<template>
  <div
    v-if="isFavorite"
    class="flex my-4 mr-2 flex-col relative border border-slate-100 w-72 rounded-3xl cursor-pointer p-8 hover:-translate-y-2 hover:shadow-xl transition bg-white"
  >
    <img
      @click="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like 1"
      class="absolute top-8 left-8"
    />
    <img :src="mainPhoto" alt="Item" class="w-54 self-center" />

    <p class="mt-2">{{ name }}</p>

    <div class="flex justify-between mt-2">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img
        v-if="!isAddedToCart && cartCount === 0"
        @click="onClickAddToCart"
        src="/plus.svg"
        alt="Plus"
      />

      <div class="flex rounded-xl items-center p-2 bg-slate-100" v-else>
        <div @click="minusProductCount">
          <img class="w-6 cursor-pointer" src="/minus.svg" alt="Minus" />
        </div>

        <span class="mx-2">{{ cartCount }}</span>

        <div @click="plusProductCount">
          <img class="w-6 cursor-pointer" src="/plus.svg" alt="Plus" />
        </div>
      </div>
    </div>
  </div>
</template>
