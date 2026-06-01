import { ref, computed } from 'vue'
import type { Product } from '../api/products'
import { useAuth } from './auth'

export interface CartItem {
  product: Product
  quantity: number
}

const items = ref<CartItem[]>([])

export function useCart() {
  const { getToken } = useAuth()

  function addToCart(product: Product) {
    const existing = items.value.find(i => i.product._id === product._id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: string) {
    items.value = items.value.filter(i => i.product._id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )

  async function confirmOrder() {
    const token = getToken()
    if (!token) throw new Error('No estás logueado')

    const orderItems = items.value.map(i => ({
      productId: i.product._id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity
    }))

    const response = await fetch('http://localhost:5005/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items: orderItems,
        total: total.value
      })
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return response.json()
  }

  return { items, addToCart, removeFromCart, clearCart, total, confirmOrder }
}