import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

export async function getGames() {
  const url = `${API_URL}/games?key=${API_KEY}`
  const { data } = await axios.get(url)
  return data.results
}
export async function getGameDetails(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_RAWG_API_URL}/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

  