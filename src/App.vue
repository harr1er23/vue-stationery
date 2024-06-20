<script setup>
import { onMounted, ref, watch, reactive } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import ItemsList from './components/ItemsList.vue'
// import Drawer from "./components/Drawer.vue";

const items = ref([])

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.name = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://6a17866731ff6fbf.mokky.dev/products', {
      params
    })

    items.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  fetchItems()
})

watch(filters, fetchItems)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white mx-24 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <ItemsList
      :onChangeSelect="onChangeSelect"
      :onChangeSearchInput="onChangeSearchInput"
      page-name="Все товары"
      :items="items"
    />
  </div>
</template>

<style scoped></style>
