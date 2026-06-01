import { ref, computed } from 'vue'

const token = ref<string | null>(null)
const userEmail = ref<string | null>(null)

export function useAuth() {
  const isLoggedIn = computed(() => token.value !== null)

  async function login(email: string, password: string) {
    const response = await fetch('http://localhost:5005/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('Email o contraseña incorrectos')
    }

    const data = await response.json()
    token.value = data.token
    userEmail.value = email
  }

  function logout() {
    token.value = null
    userEmail.value = null
  }

  function getToken() {
    return token.value
  }

  return { isLoggedIn, userEmail, login, logout, getToken }
}