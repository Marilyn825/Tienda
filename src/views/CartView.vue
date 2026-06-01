<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../stores/cart'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const { isLoggedIn } = useAuth()
const { items, removeFromCart, clearCart, total, confirmOrder } = useCart()
const router = useRouter()
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

async function handleConfirmOrder() {
  loading.value = true
  error.value = null
  try {
    await confirmOrder()
    success.value = true
    clearCart()
  } catch {
    error.value = 'No se pudo confirmar la orden. Intentá de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="cart-section">
    <h2 class="cart-title">Tu Carrito</h2>

    <div v-if="success" class="success-msg">
      ✅ ¡Orden confirmada con éxito!
      <button class="btn-home" @click="router.push('/')">Volver a la tienda</button>
    </div>

    <div v-else-if="items.length === 0" class="empty-msg">
      El carrito está vacío.
    </div>

    <div v-else>
      <div class="cart-item" v-for="item in items" :key="item.product._id">
        <div class="item-info">
          <span class="item-category">{{ item.product.category.toUpperCase() }}</span>
          <h3 class="item-name">{{ item.product.name }}</h3>
          <p class="item-brand">{{ item.product.brand }}</p>
        </div>
        <div class="item-right">
          <p class="item-quantity">Cantidad: {{ item.quantity }}</p>
          <p class="item-price">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
          <button class="btn-remove" @click="removeFromCart(item.product._id)">Quitar</button>
        </div>
      </div>

      <div class="cart-footer">
        <p class="cart-total">Total: ${{ total.toFixed(2) }}</p>
        <div class="cart-actions">
          <button class="btn-clear" @click="clearCart">Vaciar carrito</button>
          <button v-if="!isLoggedIn" class="btn-login-required" @click="router.push('/login')">
            Iniciá sesión para comprar
          </button>
          <button v-else class="btn-confirm" @click="handleConfirmOrder" :disabled="loading">
            {{ loading ? 'Procesando...' : 'Confirmar compra' }}
          </button>
        </div>
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </section>
</template>

<style scoped>
.cart-section {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.cart-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.empty-msg, .success-msg {
  text-align: center;
  color: var(--color-text);
  padding: 2rem 0;
  font-size: 1.1rem;
}

.success-msg {
  color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

.item-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text);
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0.25rem 0;
}

.item-brand {
  font-size: 0.85rem;
  color: var(--color-text);
  margin: 0;
}

.item-right {
  text-align: right;
}

.item-quantity {
  font-size: 0.9rem;
  color: var(--color-text);
  margin: 0;
}

.item-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  margin: 0.25rem 0;
}

.btn-remove {
  padding: 0.4rem 0.8rem;
  background: #e55;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 2px solid var(--color-border);
  margin-top: 1rem;
}

.cart-total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.btn-clear {
  padding: 0.6rem 1.2rem;
  background: #888;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-confirm {
  padding: 0.6rem 1.2rem;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-login-required {
  padding: 0.6rem 1.2rem;
  background: #f0a500;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-home {
  padding: 0.6rem 1.2rem;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.error-msg {
  color: #e55;
  text-align: center;
  margin-top: 1rem;
}
</style>