export interface Habit {
  id: string
  user_id: string
  name: string
  archived: boolean
  created_at: string
  updated_at: string
}

export interface DailyEntry {
  id: string
  user_id: string
  date: string
  mood: number
  energy: number
  focus: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface HabitLog {
  id: string
  user_id: string
  habit_id: string
  date: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface HabitWithLogs extends Habit {
  logs: HabitLog[]
}

export interface HabitImpact {
  habit_id: string
  habit_name: string
  completed_days: number
  missed_days: number
  avg_mood_completed: number
  avg_mood_missed: number
  avg_energy_completed: number
  avg_energy_missed: number
  avg_focus_completed: number
  avg_focus_missed: number
}
