import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    total: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
      return subtotal >= 200000 ? Math.round(subtotal * 0.9) : subtotal
    },
    
    discount: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
      return subtotal >= 200000 ? Math.round(subtotal * 0.1) : 0
    }
  },
  
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.cantidad++
      } else {
        this.items.push({ ...item, cantidad: 1 })
      }
    },
    
    removeItem(id) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    
    clearCart() {
      this.items = []
    }
  }
})