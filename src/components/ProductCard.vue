<script setup lang="ts">
import type { Product } from '../api/products'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ buy: [product: Product] }>()
</script>

<template>
  <div class="product-card">
    <img
      src="https://placehold.co/300x200?text=Producto"
      alt="Imagen del producto"
      class="product-image"
    />
    <div class="product-info">
      <span class="product-category">{{ props.product.category.toUpperCase() }}</span>
      <h3 class="product-name">{{ props.product.name }}</h3>
      <p class="product-brand">{{ props.product.brand }}</p>
      <p class="product-price">${{ props.product.price.toFixed(2) }}</p>
      <button class="btn-buy" @click="emit('buy', props.product)">Comprar</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.product-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0;
}

.product-brand {
  font-size: 0.9rem;
  color: var(--color-text);
  margin: 0;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  margin: 0;
}

.btn-buy {
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-buy:hover {
  background-color: hsla(160, 100%, 28%, 1);
}
</style>