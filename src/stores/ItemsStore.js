import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      items: [
        {
          itemId: 13,
          cartCount: 1,
          mainPhoto: 'https://s3.ibta.ru/goods/600678/96f41dc03f19b870a16736e589fd66b3_l.jpg',
          name: 'Мусорное ведро',
          price: 700,
          favoriteItemId: null,
          cartItemId: null,
          id: 1
        },
        {
          itemId: 14,
          cartCount: 2,
          mainPhoto: 'https://s3.ibta.ru/goods/600838/2788af2eef25b66c142ac50b0d0c73c1_l.jpg',
          name: 'Wine - Stoneliegh Sauvignon',
          price: 895,
          favoriteItemId: null,
          cartItemId: null,
          id: 2
        }
      ],
      cartDiscount: 0,
      cartSum: 0,
      totalPrice: 0,
      isCreatingOrder: false
    }
  },
  getters: {
    cartIsEmpty() {
      return this.items.length === 0
    },
    cartButtonDisabled() {
      return this.isCreatingOrder || this.cartIsEmpty
    },
    countCartDiscount() {
      return this.items.reduce((sum, item) => sum + item.price * item.cartCount * 0.05, 0)
    },
    countCartSum() {
      return this.items.reduce((sum, item) => sum + item.price * item.cartCount, 0)
    },
    countTotalPrice() {
      return this.countCartSum - this.countCartDiscount.toFixed(0)
    }
  },
  actions: {
    addToFavorite(obj) {
      const findCartItem = this.items.find((item) => item.favoriteItemId === obj.id)

      if (findCartItem) {
        return
      }

      this.items.push(obj)
    },
    deleteFromFavorite(id) {
      const findItem = this.items.find((item) => item.favoriteItemId === id)

      if (!findItem) {
        return
      }

      this.items = this.items.map((item) => {
        if (item.favoriteId === id) {
          return {
            ...item,
            favoriteItemId: null
          }
        }

        return item
      })
    },
    addToCart(obj) {
      const findCartItem = this.items.find((item) => item.cartItemId === obj.id)

      if (findCartItem) {
        return
      }

      this.items.push(obj)
    },
    deleteFromCart(id) {
      const findItem = this.items.find((item) => item.cartItemId === id)

      if (!findItem) {
        return
      }

      this.items = this.items.map((item) => {
        if (item.cartItemId === id) {
          return {
            ...item,
            cartItemId: null
          }
        }

        return item
      })
    },
    minusCartItem(id) {
      const findCartItem = this.items.find((item) => item.cartItemId === id)

      if (!findCartItem) {
        return
      }

      this.items = this.items.map((item) => {
        if (item.cartItemId === id) {
          return {
            ...item,
            cartCount: item.cartCount - 1
          }
        }

        return item
      })
    },
    plusCartItem(id) {
      const findCartItem = this.items.find((item) => item.cartItemId === id)

      if (!findCartItem) {
        return
      }

      this.items = this.items.map((item) => {
        if (item.cartItemId === id) {
          return {
            ...item,
            cartCount: item.cartCount + 1
          }
        }

        return item
      })
    }
  }
})
