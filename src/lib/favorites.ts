import { db } from '@/firebase/firebase'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { Game } from '@/types/games.types'

// 👉 Añadir un juego a favoritos
export async function addFavorite(userId: string, gameId: number) {
  const ref = doc(db, 'favorites', userId)
  await setDoc(ref, { games: arrayUnion(gameId) }, { merge: true })
}

// 👉 Quitar un juego de favoritos
export async function removeFavorite(userId: string, gameId: number) {
  const ref = doc(db, 'favorites', userId)
  await updateDoc(ref, { games: arrayRemove(gameId) })
}

// 👉 Obtener la lista de IDs favoritos de un usuario
export async function getFavorites(userId: string): Promise<number[]> {
  const ref = doc(db, 'favorites', userId)
  const snap = await getDoc(ref)
  const data = snap.data()
  return data?.games || []
}

// 👉 Obtener los juegos favoritos completos desde RAWG
export async function getFavoriteGames(userId: string): Promise<Game[]> {
  const ids = await getFavorites(userId)
  const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

  const games = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`${API_URL}/games/${id}?key=${API_KEY}`)
      const data = await res.json()
      return data
    })
  )

  return games
}
