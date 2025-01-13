<template>
  <div class="container mt-4">
    <!-- Carousel -->
    <div id="licoresCarousel" class="carousel slide mb-5" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(item, index) in nosotros.carrousel"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img :src="item.imagen" class="d-block w-100" :alt="item.titulo" style="height: 400px; object-fit: cover;">
          <div class="carousel-caption">
            <h5>{{ item.titulo }}</h5>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#licoresCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#licoresCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

    <!-- Nuestros Licores -->
    <h2 class="text-center mb-4">Nuestros Licores</h2>
    <div class="row">
      <div
        v-for="licor in nosotros.tiposlicores"
        :key="licor.nombre"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <img :src="licor.imagen" class="card-img-top" :alt="licor.nombre" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ licor.nombre }}</h5>
            <p class="card-text">{{ licor.texto }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nosotros = ref({
  carrousel: [],
  tiposlicores: []
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/nosotros');
    nosotros.value = response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
});
</script>