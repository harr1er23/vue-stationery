<script setup>
import Header from './components/Header.vue';
import ItemsList from './components/ItemsList.vue';
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />


    <ItemsList page-name="Все товары" />
  </div>
</template>

<style scoped></style>