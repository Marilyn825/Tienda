<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { getProducts, type Product } from '../api/products'
import { useCart } from '../stores/cart'
const { addToCart } = useCart()

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const notification = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    products.value = await getProducts()
  } catch {
    error.value = 'No se pudo conectar con la API. Verificá que el servidor Express esté corriendo en localhost:5005.'
  } finally {
    loading.value = false
  }
})

function handleBuy(product: Product) {
  addToCart(product)
  notification.value = `✓ "${product.name}" agregado al carrito`
  setTimeout(() => {
    notification.value = null
  }, 3000)
}
</script>

<template>
  <section class="product-section">
    <h2 class="section-title">Nuestros Productos</h2>

    <p v-if="loading" class="status-message">Cargando productos...</p>

    <p v-else-if="error" class="status-message error">{{ error }}</p>

    <div v-else class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
        @buy="handleBuy"
      />
    </div>

    <transition name="fade">
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>
    </transition>
  </section>
</template>

<style scoped>
.product-section {
  padding: 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 2rem;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.product-list > * {
  flex: 1 1 260px;
  max-width: 320px;
}

.status-message {
  text-align: center;
  color: var(--color-text);
  font-size: 1rem;
  padding: 2rem 0;
}

.status-message.error {
  color: #e55;
}

.notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>