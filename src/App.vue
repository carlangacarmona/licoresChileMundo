<template>
  <nav v-if="authStore.isAuthenticated" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/nosotros">Licores ChileMundo</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/nosotros">Nosotros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/licores">Licores</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-light" @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style>
#app {
  min-height: 100vh;
}
</style>