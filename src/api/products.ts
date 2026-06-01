const API_URL = import.meta.env.VITE_API_URL

export interface Product {
  _id: string
  name: string
  category: string
  brand: string
  price: number
  stock: number
  specs: Record<string, unknown>
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }
  const data = await response.json()
  return data.products  // ← clave: extraemos el array de adentro
}