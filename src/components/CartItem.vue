<script setup>
import axios from 'axios'
import { inject } from 'vue'

const isLoadingItems = inject('isLoadingItems')

const { deleteItemFromCart, cartItems, reduceCartArrayAmount, reduceItemArrayAmount } =
  inject('cart')
const items = inject('items')

const props = defineProps({
  cartCount: Number,
  id: Number,
  itemId: Number,
  mainPhoto: String,
  name: String,
  price: Number
})

const onClickMinus = () => {
  if (props.cartCount - 1 > 0) {
    axios.patch(`https://6a17866731ff6fbf.mokky.dev/cart/${props.id}`, {
      cartCount: props.cartCount - 1
    })

    reduceCartArrayAmount(props.id)
  } else {
    axios.delete(`https://6a17866731ff6fbf.mokky.dev/cart/${props.id}`)

    items.value = items.value.map((item) => {
      if (item.cartItemId === props.id) {
        return {
          ...item,
          isAddedToCart: false
        }
      }

      return item
    })

    cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== props.id)
  }

  reduceItemArrayAmount(props.id)
}

const onClickPlus = () => {
  if (props.cartCount < 30) {
    axios.patch(`https://6a17866731ff6fbf.mokky.dev/cart/${props.id}`, {
      cartCount: props.cartCount + 1
    })

    cartItems.value = cartItems.value.map((cartItem) => {
      if (cartItem.id === props.id) {
        return {
          ...cartItem,
          cartCount: props.cartCount + 1
        }
      }

      return cartItem
    })

    items.value = items.value.map((obj) => {
      if (obj.cartItemId === props.id) {
        return {
          ...obj,
          cartCount: obj.cartCount + 1
        }
      }

      return obj
    })
  }
}
</script>

<template>
  <div
    v-if="!isLoadingItems"
    class="flex border items-center border-slate-100 p-4 rounded-xl gap-4"
  >
    <img class="w-16 h-16" :src="mainPhoto" alt="Item" />

    <div class="flex flex-col justify-between w-2/5">
      <p>{{ name }}</p>

      <div class="flex flex-col justify-between mt-2">
        <b>{{ price }} руб.</b>
      </div>
    </div>

    <div class="flex ml-auto">
      <div class="flex rounded-xl items-center p-2 bg-slate-100 mr-4">
        <div class="w-6 cursor-pointer" @click="() => onClickMinus(props.id)">
          <img src="/minus.svg" alt="Minus" />
        </div>

        <span class="mx-2">{{ cartCount }}</span>

        <div class="w-6 cursor-pointer" @click="() => onClickPlus(props.id)">
          <img src="/plus.svg" alt="Plus" />
        </div>
      </div>

      <img
        @click="() => deleteItemFromCart(props.id)"
        class="opacity-40 hover:opacity-100 cursor-pointer transition"
        src="/close.svg"
        alt="Delete"
      />
    </div>
  </div>
</template>
