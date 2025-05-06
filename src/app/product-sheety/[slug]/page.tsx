import { getGameDetails } from '@/lib/requests'
import { GameDetails } from '@/types/game-details.types'

export default async function ProductSheetyPage({ params }: { params: { slug: string } }) {
  const game: GameDetails = await getGameDetails(params.slug)

  if (!game) return <p>Producto no encontrado</p>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="w-full h-64 object-cover rounded mb-4" />

      <div className="mb-4">
        <p className="text-lg font-semibold text-green-600">Precio: 39,99 €</p>
        <p className="text-sm text-gray-500">Lanzado el {game.released}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Opiniones:</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
          <li>🎮 “Un juegazo. Visualmente espectacular.”</li>
          <li>🔥 “Increíble ambientación y jugabilidad.”</li>
          <li>⭐ “Le falta multijugador, pero es brutal.”</li>
        </ul>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Añadir al carrito
      </button>
    </div>
  )
}
