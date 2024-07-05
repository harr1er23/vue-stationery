<script setup>
import { inject } from 'vue'

import AddresSelector from './AddresSelector.vue'
import Search from './Search.vue'
import PriceSkeleton from './PriceSkeleton.vue'

const { totalPrice } = inject('cart')
const category = inject('category')

const emit = defineEmits(['openDrawer'])

const isLoading = inject('isLoadingItems')
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

    <AddresSelector />
    <Search />

    <ul class="flex items-center gap-6">
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
        <b class="flex">
          <span class="mr-1" v-if="!isLoading">{{ totalPrice }}</span>
          <PriceSkeleton class="skeleton mr-1" v-else /> р.
        </b>
      </li>
      <router-link to="/login">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <div class="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              class="absolute w-8 h-8 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <span>Войти</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<style scoped>
header {
  width: 90%;
}

.skeleton {
  width: 30px;
  height: 25px;
}
</style>
