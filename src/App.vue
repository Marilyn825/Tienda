<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from './stores/cart'
import { useAuth } from './stores/auth'

const router = useRouter()
const { items } = useCart()
const { isLoggedIn, userEmail, logout } = useAuth()

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="60" height="60" />
    <h1 class="app-title">Tienda de PCs Custom</h1>

    <nav class="app-nav">
      <button class="btn-cart" @click="router.push('/cart')">
        🛒 Carrito ({{ items.length }})
      </button>

      <span v-if="isLoggedIn" class="user-info">
        {{ userEmail }}
        <button class="btn-logout" @click="handleLogout">Salir</button>
      </span>

      <button v-else class="btn-login" @click="router.push('/login')">
        Iniciar sesión
      </button>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

.logo {
  display: block;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
  flex: 1;
}

.app-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-cart {
  padding: 0.6rem 1.2rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-login {
  padding: 0.6rem 1.2rem;
  background: transparent;
  color: var(--color-heading);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-text);
}

.btn-logout {
  padding: 0.4rem 0.8rem;
  background: #888;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}
</style>