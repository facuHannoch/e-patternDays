'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getHabits } from '@/lib/supabase/queries'
import { createHabit, archiveHabit } from '@/lib/supabase/mutations'
import { Habit } from '@/lib/types'

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabitName, setNewHabitName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadHabits()
  }, [])

  const loadHabits = async () => {
    try {
      const data = await getHabits()
      setHabits(data)
    } catch (err) {
      setError('Failed to load habits')
    } finally {
      setLoading(false)
    }
  }

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!newHabitName.trim()) {
      setError('Habit name is required')
      return
    }

    try {
      await createHabit(newHabitName)
      setNewHabitName('')
      await loadHabits()
    } catch (err) {
      setError('Failed to create habit')
    }
  }

  const handleArchiveHabit = async (habitId: string) => {
    try {
      await archiveHabit(habitId)
      await loadHabits()
    } catch (err) {
      setError('Failed to archive habit')
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
            <Link href="/entries" className="text-gray-700 hover:text-gray-900">
              Entries
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button className="text-gray-700 hover:text-gray-900">Sign Out</button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Habits</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Habit</h2>
          <form onSubmit={handleAddHabit} className="flex gap-4">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="e.g., Morning meditation, Exercise, Read"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Add Habit
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading habits...</div>
        ) : habits.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p>No habits yet. Create your first habit above!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y">
              {habits.map((habit) => (
                <li
                  key={habit.id}
                  className="p-6 flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Created {new Date(habit.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleArchiveHabit(habit.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Archive
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}
