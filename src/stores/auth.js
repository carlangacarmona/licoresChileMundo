import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
    error: null
  }),
  
  actions: {
    async login(email, password) {
      try {
        const response = await axios.get('/api/usuarios')
        const users = response.data
        const user = users.find(u => u.user === email && u.pass === password)
        
        if (user) {
          this.isAuthenticated = true
          this.currentUser = user.user
          this.error = null
          return true
        }
        this.error = 'Credenciales inválidas'
        return false
      } catch (err) {
        console.error('Error de conexión:', err)
        this.error = 'Error de conexión al servidor'
        return false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.currentUser = null
      this.error = null
    }
  }
})