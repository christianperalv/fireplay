'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number
  name: string
  background_image: string
  price: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const handleRemove = (id: number) => {
    const updated = cart.filter((item) => item.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Tu carrito</h1>
      <p className="text-gray-600">Revisa tus juegos antes de finalizar la compra.</p>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 border-dashed border-2 p-8 rounded">
          <p className="mb-2 font-medium">Tu carrito está vacío.</p>
          <button
            onClick={() => router.push('/games')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Explorar juegos
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded shadow p-4 relative hover:shadow-md transition"
              >
                <img
                  src={item.background_image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 mb-2">Precio: {item.price.toFixed(2)} €</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Quitar del carrito
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center justify-between">
            <p className="text-xl font-semibold">Total: {total.toFixed(2)} €</p>
            <button
              onClick={() => alert('¡Gracias por tu compra!')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  )
}
