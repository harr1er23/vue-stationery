<script setup>
import { inject } from 'vue'

import ItemsList from '../components/ItemsList.vue'
// import Carousel from '../components/Carousel.vue'
import ItemsSkeleton from '../components/ItemsSkeleton.vue'
// import SelectFilter from '../components/SelectFilter.vue'
// import BannerSkeleton from '../components/BannerSkeleton.vue'
import StoksList from '../components/StoksList.vue'
import ParametersList from '../components/ParametersList.vue'
import Pagination from '../components/Pagination.vue'

const stoks = inject('stoks')
const { items, totalItems, totalPages } = inject('items')
const isLoading = inject('isLoadingItems')
const filters = inject('filters')
</script>

<template>
  <ParametersList />

  <main class="content rounded-xl shadow-xl p-4 mt-28 bg-white overflow-hidden">
    <div class="flex flex-col scroll-container overflow-y-auto h-full">
      <!-- <Carousel v-if="!isLoading" /> -->
      <!-- <BannerSkeleton v-else /> -->

      <div v-if="!filters.searchQuery">
        <StoksList v-if="!isLoading" :stoks="stoks" />
        <ItemsSkeleton v-else :count="4" />

        <!--<div class="pt-6 pl-10">
            <div class="flex justify-between items-center">
              <h2 class="text-3xl font-bold mb-8">Акции</h2>
            </div>
          </div>-->

        <div class="p-10">
          <div class="flex justify-between items-center">
            <h2 class="text-3xl font-bold mb-8">Возможно вам понравится</h2>
            <div class="flex gap-4">
              <SelectFilter />
            </div>
          </div>
        </div>
      </div>

      <ItemsList v-if="!isLoading" :items="items" />
      <ItemsSkeleton v-else :count="8" />

      <Pagination
        v-if="totalPages > 1"
        class="self-center mt-4"
        :totalIitems="totalItems"
        :currentPage="filters.page"
        :limit="filters.limit"
      />
    </div>
  </main>
</template>

<style scoped>
.scroll-container {
  height: calc(100vh - 170px);
  overflow-y: auto;
}
</style>
