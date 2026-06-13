'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEntries } from '@/lib/supabase/queries'
import { DailyEntry } from '@/lib/types'

export default function EntriesPage() {
  const [entries, setEntries] = useState<DailyEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      const data = await getEntries(100)
      setEntries(data)
    } catch (err) {
      setError('Failed to load entries')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
            PatternDays
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/habits" className="text-gray-700 hover:text-gray-900">
              Habits
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button className="text-gray-700 hover:text-gray-900">Sign Out</button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Daily Entries</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-600">Loading entries...</div>
        ) : entries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p>No entries yet. Start tracking your habits on the mobile app!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Mood
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Energy
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Focus
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.mood}/10</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {entry.energy}/10
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.focus}/10</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {entry.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
