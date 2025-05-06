'use client'

import { useEffect, useState } from 'react'
import { getGames } from '@/lib/requests'
import { Game } from '@/types/games.types'
import GameCard from '@/components/GameCard'

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    async function fetchGames() {
      const data = await getGames()
      setGames(data)
      setFilteredGames(data)
    }
    fetchGames()
  }, [])

  useEffect(() => {
    let sorted = [...games]

    if (filter === 'rating') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
    if (filter === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (filter === 'released') {
      sorted.sort((a, b) => {
        const dateA = new Date(a.released || '').getTime()
        const dateB = new Date(b.released || '').getTime()
        return dateB - dateA
      })
    }

    setFilteredGames(sorted)
  }, [filter, games])

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todos los Juegos</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter('')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('rating')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Mejor valorados
        </button>
        <button
          onClick={() => setFilter('name')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          A-Z
        </button>
        <button
          onClick={() => setFilter('released')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Más recientes
        </button>
      </div>

      {filteredGames.length === 0 ? (
        <p className="text-gray-600">No hay juegos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
