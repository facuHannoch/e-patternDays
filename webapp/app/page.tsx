import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  // Skip Supabase check if environment variables are not configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    try {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        redirect('/dashboard')
      }
    } catch {
      // Continue to landing page if auth check fails
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">PatternDays</div>
          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Track your habits. Notice the patterns.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            PatternDays is a simple habit tracking app that connects daily check-ins with how you feel and perform. See which habits correlate with your best days.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile App</h2>
              <p className="text-gray-600 mb-4">
                Quick daily check-ins on your phone. Track completed habits and rate your mood, energy, and focus.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Mark habits completed or missed
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Rate mood, energy, focus
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Add optional notes
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Web Dashboard</h2>
              <p className="text-gray-600 mb-4">
                Analyze patterns in your data. See trends and discover which habits correlate with your best days.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Habit completion rates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Score trends
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Habit impact insights
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-gray-600">
        <p>&copy; 2026 Qlairos Labs. All rights reserved.</p>
      </footer>
    </div>
  )
}
