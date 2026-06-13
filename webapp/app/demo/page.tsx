'use client'

import Link from 'next/link'
import ScoreChart from '@/components/ScoreChart'
import CompletionChart from '@/components/CompletionChart'
import { DailyEntry, HabitImpact } from '@/lib/types'

export default function DemoPage() {
  // Mock data for demonstration
  const mockEntries: DailyEntry[] = [
    { id: '1', user_id: '', date: '2026-06-13', mood: 8, energy: 7, focus: 8, notes: 'Great day', created_at: '', updated_at: '' },
    { id: '2', user_id: '', date: '2026-06-12', mood: 7, energy: 6, focus: 7, notes: '', created_at: '', updated_at: '' },
    { id: '3', user_id: '', date: '2026-06-11', mood: 6, energy: 5, focus: 6, notes: 'Tired', created_at: '', updated_at: '' },
    { id: '4', user_id: '', date: '2026-06-10', mood: 8, energy: 8, focus: 9, notes: '', created_at: '', updated_at: '' },
    { id: '5', user_id: '', date: '2026-06-09', mood: 7, energy: 7, focus: 8, notes: '', created_at: '', updated_at: '' },
    { id: '6', user_id: '', date: '2026-06-08', mood: 5, energy: 4, focus: 5, notes: 'Difficult day', created_at: '', updated_at: '' },
    { id: '7', user_id: '', date: '2026-06-07', mood: 8, energy: 8, focus: 8, notes: '', created_at: '', updated_at: '' },
  ]

  const mockImpacts: HabitImpact[] = [
    {
      habit_id: '1',
      habit_name: 'Morning Exercise',
      completed_days: 5,
      missed_days: 2,
      avg_mood_completed: 7.8,
      avg_mood_missed: 5.5,
      avg_energy_completed: 7.6,
      avg_energy_missed: 4.5,
      avg_focus_completed: 8.2,
      avg_focus_missed: 5.5,
    },
    {
      habit_id: '2',
      habit_name: 'Meditation',
      completed_days: 4,
      missed_days: 3,
      avg_mood_completed: 8.0,
      avg_mood_missed: 6.3,
      avg_energy_completed: 7.5,
      avg_energy_missed: 6.0,
      avg_focus_completed: 8.5,
      avg_focus_missed: 6.7,
    },
  ]

  const insights = [
    'Your average mood is higher on days you complete Morning Exercise.',
    'Your average energy is higher on days you complete Morning Exercise.',
    'Your average focus is higher on days you complete Meditation.',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            PatternDays
          </Link>
          <div className="flex gap-4">
            <Link href="/demo/habits" className="text-gray-700 hover:text-gray-900">
              Habits
            </Link>
            <Link href="/demo/entries" className="text-gray-700 hover:text-gray-900">
              Entries
            </Link>
            <button className="text-gray-700 hover:text-gray-900">Sign Out</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Active Habits</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">2</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Completion Rate</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">71%</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Best Streak</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">5 days</div>
            <div className="text-sm text-gray-600 mt-1">Morning Exercise</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Entries</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">7</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Score Trends</h2>
            <ScoreChart entries={mockEntries} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Habit Completion</h2>
            <CompletionChart impacts={mockImpacts} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Habit Impact</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mockImpacts.map((impact) => (
              <div key={impact.habit_id} className="border border-gray-200 rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{impact.habit_name}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Mood</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {impact.avg_mood_completed.toFixed(1)} vs {impact.avg_mood_missed.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Energy</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {impact.avg_energy_completed.toFixed(1)} vs {impact.avg_energy_missed.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Focus</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {impact.avg_focus_completed.toFixed(1)} vs {impact.avg_focus_missed.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Insights</h2>
          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <li key={i} className="text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Entries</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-2 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-900">Mood</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-900">Energy</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-900">Focus</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                {mockEntries.slice(0, 10).map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{entry.date}</td>
                    <td className="py-3 px-2">{entry.mood}/10</td>
                    <td className="py-3 px-2">{entry.energy}/10</td>
                    <td className="py-3 px-2">{entry.focus}/10</td>
                    <td className="py-3 px-2 text-gray-600 truncate">
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
