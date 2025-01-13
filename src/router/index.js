import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import Nosotros from '../views/Nosotros.vue'
import Licores from '../views/Licores.vue'
import Confirmacion from '../views/Confirmacion.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/nosotros',
    component: Nosotros,
    meta: { requiresAuth: true }
  },
  {
    path: '/licores',
    component: Licores,
    meta: { requiresAuth: true }
  },
  {
    path: '/confirmacion',
    component: Confirmacion,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router