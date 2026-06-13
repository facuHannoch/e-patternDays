'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DailyEntry } from '@/lib/types'

interface ScoreChartProps {
  entries: DailyEntry[]
}

export default function ScoreChart({ entries }: ScoreChartProps) {
  const data = entries
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30)
    .map((entry) => ({
      date: entry.date,
      mood: entry.mood,
      energy: entry.energy,
      focus: entry.focus,
    }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          domain={[0, 10]}
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="energy"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="focus"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
