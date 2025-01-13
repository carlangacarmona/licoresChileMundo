<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body text-center">
        <h2 class="card-title mb-4">¡Gracias por tu compra!</h2>
        <div class="alert alert-success">
          <h4 class="alert-heading">Orden Confirmada</h4>
          <p class="mb-0">Número de Orden: {{ orderNumber }}</p>
        </div>
        
        <div class="mt-4">
          <h5>Resumen de tu compra:</h5>
          <h4><strong>Total:</strong> ${{ cartStore.total.toLocaleString() }}</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartStore.items" :key="item.id">
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>${{ item.precio.toLocaleString() }}</td>
                  <td>${{ (item.precio * item.cantidad).toLocaleString() }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="cartStore.discount > 0">
                  <td colspan="3" class="text-end"><strong>Descuento (10%):</strong></td>
                  <td>-${{ cartStore.discount.toLocaleString() }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end"><strong>Total:</strong></td>
                  <td><strong>${{ cartStore.total.toLocaleString() }}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div class="mt-4">
          <router-link to="/licores" class="btn btn-primary">
            Volver a la tienda
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();
const orderNumber = ref('');

onMounted(() => {
  if (cartStore.items.length === 0) {
    router.push('/licores');
  } else {
    // Generar número de pedido usando marca de tiempo y número aleatorio
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    orderNumber.value = `${timestamp}-${random}`;
    
    // Borrar carrito después de confirmar el pedido
    cartStore.clearCart();
  }
});
</script>