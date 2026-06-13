'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { HabitImpact } from '@/lib/types'

interface CompletionChartProps {
  impacts: HabitImpact[]
}

export default function CompletionChart({ impacts }: CompletionChartProps) {
  const data = impacts.map((impact) => ({
    name: impact.habit_name,
    completed: impact.completed_days,
    missed: impact.missed_days,
  }))

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No habit data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#10b981" />
        <Bar dataKey="missed" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
