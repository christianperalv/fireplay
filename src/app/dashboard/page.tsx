'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { getFavoriteGames, removeFavorite } from '@/lib/favorites'
import { Game } from '@/types/games.types'
import GameCard from '@/components/GameCard'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        const favGames = await getFavoriteGames(user.uid)
        setFavorites(favGames)
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleRemoveFavorite = async (gameId: number) => {
    if (!user) return
    await removeFavorite(user.uid, gameId)
    const updated = favorites.filter((game) => game.id !== gameId)
    setFavorites(updated)
  }

  if (loading) {
    return <p className="p-8 text-gray-600">Cargando tu perfil...</p>
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-primary">Mi Dashboard</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-6 rounded shadow">
        <div className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
          {user?.displayName?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName || 'Usuario'}</h2>
          <p className="text-gray-600">{user?.email}</p>
          {user?.emailVerified && (
            <span className="text-green-600 text-sm font-medium">✓ Email verificado</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mis juegos favoritos</h2>
          <button
            onClick={() => router.push('/games')}
            className="text-sm text-blue-600 hover:underline"
          >
            Explorar más juegos
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 border-dashed border-2 p-8 rounded">
            <p className="mb-2 font-medium">Todavía no tienes juegos favoritos.</p>
            <button
              onClick={() => router.push('/games')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Añadir favoritos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((game) => (
              <div
                key={game.id}
                className="relative bg-white rounded shadow overflow-hidden group transition hover:shadow-lg"
              >
                <GameCard game={game} />
                <button
                  onClick={() => handleRemoveFavorite(game.id)}
                  className="absolute top-2 right-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
