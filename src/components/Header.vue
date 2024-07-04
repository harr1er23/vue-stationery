<script setup>
import { inject } from 'vue'

const { totalPrice } = inject('cart')
const category = inject('category')

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between z-10 fixed bg-white rounded-xl shadow-lg px-10 py-6">
    <router-link to="/">
      <div class="flex items-center gap-4" @click="() => (category = 'Все товары')">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Stationery</h2>
          <p class="text-slate-400">Лучший магазин канцтоваров</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <router-link to="/favorite">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </li>
      </router-link>

      <router-link to="/profile">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Профиль</span>
        </li>
      </router-link>

      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b> {{ totalPrice }} р.</b>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  width: 90%;
}
</style>
