<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import ItemsList from './components/ItemsList.vue'
// import Drawer from "./components/Drawer.vue";

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/products')

    items.value = data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white mx-24 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <ItemsList page-name="Все товары" :items="items" />
  </div>
</template>

<style scoped></style>
