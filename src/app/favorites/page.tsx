'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { getFavoriteGames } from '@/lib/favorites'
import { Game } from '@/types/games.types'
import GameCard from '@/components/GameCard'
import { useRouter } from 'next/navigation'

export default function FavoritesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const favGames = await getFavoriteGames(user.uid)
        setGames(favGames)
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return <p className="p-8 text-gray-600">Cargando tus juegos favoritos...</p>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Tus favoritos</h1>
      <p className="text-gray-600 mb-8">Aquí verás los juegos que has guardado como favoritos.</p>

      {games.length === 0 ? (
        <div className="text-center text-gray-500 border-dashed border-2 p-8 rounded">
          <p className="mb-2 font-medium">No tienes favoritos todavía.</p>
          <button
            onClick={() => router.push('/games')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Explorar juegos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
