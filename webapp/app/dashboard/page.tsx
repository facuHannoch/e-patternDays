import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getHabits, getEntries, getHabitLogsInRange } from '@/lib/supabase/queries'
import {
  calculateCompletionRate,
  getBestHabitStreak,
  calculateHabitImpact,
  generateInsights,
  getAverageScores,
} from '@/lib/analytics'
import { format, subDays } from 'date-fns'
import ScoreChart from '@/components/ScoreChart'
import CompletionChart from '@/components/CompletionChart'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData?.user) {
    redirect('/sign-in')
  }

  const habits = await getHabits()
  const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd')
  const today = format(new Date(), 'yyyy-MM-dd')

  const entries = await getEntries(30)
  const logs = await getHabitLogsInRange(habits[0]?.id || '', thirtyDaysAgo, today)

  const completionRate = calculateCompletionRate(logs, habits, 30)
  const bestStreak = getBestHabitStreak(logs, habits)
  const averageScores = getAverageScores(entries)

  const impacts = habits.map((habit) =>
    calculateHabitImpact(habit.id, habit.name, logs, entries)
  )
  const insights = generateInsights(impacts)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
            PatternDays
          </Link>
          <div className="flex gap-4">
            <Link href="/habits" className="text-gray-700 hover:text-gray-900">
              Habits
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Active Habits</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{habits.length}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Completion Rate</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {completionRate.toFixed(0)}%
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Best Streak</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {bestStreak?.streak || 0} days
            </div>
            {bestStreak && (
              <div className="text-sm text-gray-600 mt-1">{bestStreak.habitName}</div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium">Entries</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{entries.length}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Score Trends</h2>
            <ScoreChart entries={entries} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Habit Completion</h2>
            <CompletionChart impacts={impacts} />
          </div>
        </div>

        {impacts.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Habit Impact</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {impacts.map((impact) => (
                <div key={impact.habit_id} className="border border-gray-200 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{impact.habit_name}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Mood</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {impact.avg_mood_completed.toFixed(1)} vs{' '}
                        {impact.avg_mood_missed.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Energy</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {impact.avg_energy_completed.toFixed(1)} vs{' '}
                        {impact.avg_energy_missed.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Focus</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {impact.avg_focus_completed.toFixed(1)} vs{' '}
                        {impact.avg_focus_missed.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {insights.length > 0 && (
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
        )}

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
                {entries.slice(0, 10).map((entry) => (
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
          <div className="mt-4">
            <Link
              href="/entries"
              className="text-blue-600 hover:underline font-medium"
            >
              View all entries →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
