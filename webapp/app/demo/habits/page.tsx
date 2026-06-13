'use client'

import Link from 'next/link'

const mockHabits = [
  { id: '1', name: 'Morning Exercise', created_at: '2026-06-01' },
  { id: '2', name: 'Meditation', created_at: '2026-06-01' },
  { id: '3', name: 'Read 30 minutes', created_at: '2026-06-05' },
]

export default function DemoHabitsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/demo" className="text-2xl font-bold text-gray-900">
            PatternDays
          </Link>
          <div className="flex gap-4">
            <Link href="/demo" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/demo/entries" className="text-gray-700 hover:text-gray-900">
              Entries
            </Link>
            <button className="text-gray-700 hover:text-gray-900">Sign Out</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Habits</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Habit</h2>
          <form className="flex gap-4">
            <input
              type="text"
              placeholder="e.g., Morning meditation, Exercise, Read"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Add Habit
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y">
            {mockHabits.map((habit) => (
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
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Archive
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
