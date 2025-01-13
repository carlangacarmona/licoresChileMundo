<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Listado de Licores -->
      <div class="col-md-8">
        <h2 class="mb-4">Nuestros Licores</h2>
        <div class="row">
          <div v-for="licor in licores" :key="licor.id" class="col-md-6 mb-4">
            <div class="card h-100">
              <img :src="licor.imagen" class="card-img-top" :alt="licor.nombre" style="height: 400px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">{{ licor.nombre }}</h5>
                <p class="card-text">{{ licor.descripcion }}</p>
                <p class="card-text"><small class="text-muted">Grados: {{ licor.grados }}</small></p>
                <p class="card-text"><strong>Precio: ${{ licor.precio.toLocaleString() }}</strong></p>
                <button class="btn btn-primary" @click="addToCart(licor)">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bolsa de Compras -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Bolsa de Compras</h3>
            <div v-if="cartStore.items.length === 0" class="text-center py-3">
              <p>Tu bolsa está vacía</p>
            </div>
            <div v-else>
              <div v-for="item in cartStore.items" :key="item.id" class="d-flex align-items-center mb-3">
                <img :src="item.imagen" :alt="item.nombre" style="width: 50px; height: 50px; object-fit: cover;" class="me-2">
                <div class="flex-grow-1">
                  <h6 class="mb-0">{{ item.nombre }}</h6>
                  <small>${{ item.precio.toLocaleString() }} x {{ item.cantidad }}</small>
                </div>
                <button class="btn btn-danger btn-sm" @click="removeFromCart(item.id)">X</button>
              </div>
              
              <hr>
              <div class="mb-2">
                <strong>Subtotal:</strong> ${{ calculateSubtotal().toLocaleString() }}
              </div>
              <div v-if="cartStore.discount > 0" class="mb-2 text-success">
                <strong>Descuento (10%):</strong> -${{ cartStore.discount.toLocaleString() }}
              </div>
              <div class="mb-3">
                <strong>Total:</strong> ${{ cartStore.total.toLocaleString() }}
              </div>
              <button
                class="btn btn-success w-100"
                @click="proceedToCheckout"
                :disabled="cartStore.items.length === 0"
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import axios from 'axios';

const router = useRouter();
const cartStore = useCartStore();
const licores = ref([]);

const calculateSubtotal = () => {
  return cartStore.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
};

const addToCart = (licor: any) => {
  cartStore.addItem({
    id: licor.id,
    nombre: licor.nombre,
    precio: licor.precio,
    imagen: licor.imagen
  });
};

const removeFromCart = (id: string) => {
  cartStore.removeItem(id);
};

const proceedToCheckout = () => {
  router.push('/confirmacion');
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/licores');
    licores.value = response.data;
  } catch (error) {
    console.error('Error fetching licores:', error);
  }
});
</script>