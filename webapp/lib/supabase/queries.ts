'use server'

import { createClient } from '@/lib/supabase/server'
import { Habit, DailyEntry, HabitLog } from '@/lib/types'

export async function getHabits(): Promise<Habit[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('archived', false)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

export async function getHabitLogs(date: string): Promise<HabitLog[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('date', date)

  if (error) throw new Error(error.message)
  return data || []
}

export async function getEntry(date: string): Promise<DailyEntry | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('daily_entries')
    .select('*')
    .eq('date', date)
    .single()

  if (error && error.code !== 'PGRST116') throw new Error(error.message)
  return data || null
}

export async function getEntries(limit: number = 30): Promise<DailyEntry[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('daily_entries')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data || []
}

export async function getEntriesInRange(startDate: string, endDate: string): Promise<DailyEntry[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('daily_entries')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

export async function getHabitLogsInRange(
  habitId: string,
  startDate: string,
  endDate: string
): Promise<HabitLog[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('habit_id', habitId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}
