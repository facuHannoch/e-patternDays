'use server'

import { createClient } from '@/lib/supabase/server'
import { Habit, DailyEntry, HabitLog } from '@/lib/types'

export async function createHabit(name: string): Promise<Habit> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('habits')
    .insert([{ name }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateHabit(id: string, updates: Partial<Habit>): Promise<Habit> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function archiveHabit(id: string): Promise<Habit> {
  return updateHabit(id, { archived: true })
}

export async function upsertEntry(
  date: string,
  mood: number,
  energy: number,
  focus: number,
  notes?: string
): Promise<DailyEntry> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('daily_entries')
    .upsert({ date, mood, energy, focus, notes })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function upsertHabitLog(
  habitId: string,
  date: string,
  completed: boolean
): Promise<HabitLog> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('habit_logs')
    .upsert({ habit_id: habitId, date, completed })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteHabitLog(habitId: string, date: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('habit_logs')
    .delete()
    .eq('habit_id', habitId)
    .eq('date', date)

  if (error) throw new Error(error.message)
}
