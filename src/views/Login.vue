<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center mb-4">Iniciar Sesión</h2>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                >
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                >
              </div>
              <div v-if="authStore.error" class="alert alert-danger">
                {{ authStore.error }}
              </div>
              <button type="submit" class="btn btn-primary w-100">
                Ingresar
              </button>
            </form>
            <div class="mt-3">
              <small class="text-muted">
                Usuarios de prueba:<br>
                Email: elfar@edutecno.com, Pass: 123<br>
                Email: salome@edutecno.com, Pass: 456<br>
                Email: nubia@edutecno.com, Pass: 789
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  const success = await authStore.login(email.value, parseInt(password.value));
  if (success) {
    router.push('/nosotros');
  }
};
</script>