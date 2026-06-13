'use client'

import Link from 'next/link'

const mockEntries = [
  { id: '1', date: '2026-06-13', mood: 8, energy: 7, focus: 8, notes: 'Great day' },
  { id: '2', date: '2026-06-12', mood: 7, energy: 6, focus: 7, notes: '' },
  { id: '3', date: '2026-06-11', mood: 6, energy: 5, focus: 6, notes: 'Tired' },
  { id: '4', date: '2026-06-10', mood: 8, energy: 8, focus: 9, notes: '' },
  { id: '5', date: '2026-06-09', mood: 7, energy: 7, focus: 8, notes: 'Good focus' },
  { id: '6', date: '2026-06-08', mood: 5, energy: 4, focus: 5, notes: 'Difficult day' },
  { id: '7', date: '2026-06-07', mood: 8, energy: 8, focus: 8, notes: '' },
  { id: '8', date: '2026-06-06', mood: 6, energy: 6, focus: 7, notes: 'Regular day' },
  { id: '9', date: '2026-06-05', mood: 7, energy: 7, focus: 8, notes: '' },
  { id: '10', date: '2026-06-04', mood: 9, energy: 8, focus: 9, notes: 'Excellent!' },
]

export default function DemoEntriesPage() {
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
            <Link href="/demo/habits" className="text-gray-700 hover:text-gray-900">
              Habits
            </Link>
            <button className="text-gray-700 hover:text-gray-900">Sign Out</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Daily Entries</h1>

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
                {mockEntries.map((entry) => (
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
      </main>
    </div>
  )
}
