<script setup>
import Header from '../components/Header.vue'
import Drawer from '../components/Drawer.vue'
import { provide, ref } from 'vue'

const showDrawer = ref(false)

const openDrawer = () => {
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
}

provide('closeDrawer', closeDrawer)
</script>

<template>
  <Drawer v-if="showDrawer" />
  <div class="flex flex-col rounded-xl mx-24">
    <Header @open-drawer="openDrawer" :cart-sum="cartSum" />

    <div class="flex">
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
