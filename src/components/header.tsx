'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim() === '') return
    router.push(`/search?query=${search}`)
    setSearch('')
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <header className="bg-[var(--color-primary)] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Fireplay
        </Link>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded text-black"
          />
          <button
            type="submit"
            className="bg-white text-[var(--color-primary)] font-bold px-3 rounded"
          >
            Buscar
          </button>
        </form>

        <nav className="flex gap-4 items-center">
          <Link href="/favorites" className="hover:underline">
            Favoritos
          </Link>
          <Link href="/cart" className="hover:underline">
            Carrito
          </Link>
          {user ? (
            <>
              <span className="text-sm">{user.displayName || user.email}</span>
              <button onClick={handleLogout} className="ml-2 underline text-sm">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
