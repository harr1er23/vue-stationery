<script setup>
defineProps({
  cartSum: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between z-10 fixed bg-white rounded-xl shadow-lg px-10 py-6">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Stationery</h2>
        <p class="text-slate-400">Лучший магазин канцтоваров</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="Favorite" />
        <span>Закладки</span>
      </li>

      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <span>Профиль</span>
      </li>

      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b> {{ cartSum }} р.</b>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  width: 90%;
}
</style>
