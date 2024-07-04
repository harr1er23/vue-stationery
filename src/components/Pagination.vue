<template>
  <div class="example-six">
    <vue-awesome-paginate
      :total-items="totalIitems"
      v-model="currentPage"
      :items-per-page="limit"
      :max-pages-shown="2"
      @click="onClickHandler"
    >
      <template #prev-button>
        <span class="justify-self-center self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>

      <template #next-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script setup>
import { inject, ref, toRefs, watchEffect } from 'vue'

const props = defineProps({
  totalIitems: Number,
  currentPage: Number,
  limit: Number
})

const filters = inject('filters')

const { totalIitems, limit } = toRefs(props)
const currentPage = ref(props.currentPage)

watchEffect(() => {
  currentPage.value = props.currentPage
})

const onClickHandler = (page) => {
  filters.page = page
}
</script>

<style>
.example-six .pagination-container {
  column-gap: 10px;
  align-items: center;
}
.example-six .paginate-buttons {
  height: 35px;
  width: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: black;
}

.example-six .back-button,
.example-six .next-button {
  background-color: black;
  color: white;
  border-radius: 8px;
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.example-six .active-page {
  background-color: #e5e5e5;
}
.example-six .paginate-buttons:hover {
  background-color: #f5f5f5;
}
.example-six .active-page:hover {
  background-color: #e5e5e5;
}

.example-six .back-button svg {
  transform: rotate(180deg) translateY(-2px);
}
.example-six .next-button svg {
  transform: translateY(2px);
}

.example-six .back-button:hover,
.example-six .next-button:hover {
  background-color: rgb(45, 45, 45);
}

.example-six .back-button:active,
.example-six .next-button:active {
  background-color: rgb(85, 85, 85);
}
</style>
