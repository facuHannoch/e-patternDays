import { Habit, DailyEntry, HabitLog, HabitImpact } from '@/lib/types'

export function calculateCompletionRate(
  logs: HabitLog[],
  habits: Habit[],
  days: number
): number {
  if (habits.length === 0) return 0
  const totalPossible = habits.length * days
  const completed = logs.filter((l) => l.completed).length
  return totalPossible > 0 ? (completed / totalPossible) * 100 : 0
}

export function getBestStreak(logs: HabitLog[], habitId: string): number {
  const habitLogs = logs
    .filter((l) => l.habit_id === habitId && l.completed)
    .sort((a, b) => a.date.localeCompare(b.date))

  if (habitLogs.length === 0) return 0

  let maxStreak = 1
  let currentStreak = 1

  for (let i = 1; i < habitLogs.length; i++) {
    const prevDate = new Date(habitLogs[i - 1].date)
    const currDate = new Date(habitLogs[i].date)
    const diffDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDays === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return maxStreak
}

export function getBestHabitStreak(logs: HabitLog[], habits: Habit[]): { habitId: string; habitName: string; streak: number } | null {
  let best = { habitId: '', habitName: '', streak: 0 }

  for (const habit of habits) {
    const streak = getBestStreak(logs, habit.id)
    if (streak > best.streak) {
      best = { habitId: habit.id, habitName: habit.name, streak }
    }
  }

  return best.streak > 0 ? best : null
}

export function calculateHabitImpact(
  habitId: string,
  habitName: string,
  logs: HabitLog[],
  entries: DailyEntry[]
): HabitImpact {
  const habitLogs = logs.filter((l) => l.habit_id === habitId)

  const completedDates = new Set(
    habitLogs.filter((l) => l.completed).map((l) => l.date)
  )

  const completedEntries = entries.filter((e) => completedDates.has(e.date))
  const missedEntries = entries.filter((e) => !completedDates.has(e.date))

  const calcAvg = (arr: DailyEntry[], field: 'mood' | 'energy' | 'focus') => {
    if (arr.length === 0) return 0
    const sum = arr.reduce((acc, e) => acc + e[field], 0)
    return sum / arr.length
  }

  return {
    habit_id: habitId,
    habit_name: habitName,
    completed_days: completedEntries.length,
    missed_days: missedEntries.length,
    avg_mood_completed: calcAvg(completedEntries, 'mood'),
    avg_mood_missed: calcAvg(missedEntries, 'mood'),
    avg_energy_completed: calcAvg(completedEntries, 'energy'),
    avg_energy_missed: calcAvg(missedEntries, 'energy'),
    avg_focus_completed: calcAvg(completedEntries, 'focus'),
    avg_focus_missed: calcAvg(missedEntries, 'focus'),
  }
}

export function generateInsights(impacts: HabitImpact[]): string[] {
  const insights: string[] = []

  for (const impact of impacts) {
    if (impact.completed_days === 0 || impact.missed_days === 0) continue

    const moodDiff = impact.avg_mood_completed - impact.avg_mood_missed
    const energyDiff = impact.avg_energy_completed - impact.avg_energy_missed
    const focusDiff = impact.avg_focus_completed - impact.avg_focus_missed

    const minThreshold = 0.3

    if (moodDiff > minThreshold) {
      insights.push(
        `Your average mood is higher on days you complete ${impact.habit_name}.`
      )
    } else if (moodDiff < -minThreshold) {
      insights.push(
        `Your average mood is lower on days you complete ${impact.habit_name}.`
      )
    }

    if (energyDiff > minThreshold) {
      insights.push(
        `Your average energy is higher on days you complete ${impact.habit_name}.`
      )
    } else if (energyDiff < -minThreshold) {
      insights.push(
        `Your average energy is lower on days you complete ${impact.habit_name}.`
      )
    }

    if (focusDiff > minThreshold) {
      insights.push(
        `Your average focus is higher on days you complete ${impact.habit_name}.`
      )
    } else if (focusDiff < -minThreshold) {
      insights.push(
        `Your average focus is lower on days you complete ${impact.habit_name}.`
      )
    }
  }

  return insights
}

export function getAverageScores(entries: DailyEntry[]): {
  mood: number
  energy: number
  focus: number
} {
  if (entries.length === 0) {
    return { mood: 0, energy: 0, focus: 0 }
  }

  return {
    mood: entries.reduce((sum, e) => sum + e.mood, 0) / entries.length,
    energy: entries.reduce((sum, e) => sum + e.energy, 0) / entries.length,
    focus: entries.reduce((sum, e) => sum + e.focus, 0) / entries.length,
  }
}
