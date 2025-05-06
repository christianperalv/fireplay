import { getGames } from '@/lib/requests'
import GameCard from '@/components/GameCard'
import { Game } from '@/types/games.types'

export default async function GamesPage() {
  const games: Game[] = await getGames()

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  )
}
