import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/models.dart';
import '../services/logger.dart';

class HabitRepository {
  final SupabaseClient supabaseClient;

  HabitRepository({required this.supabaseClient});

  Future<List<Habit>> getUserHabits() async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final response = await supabaseClient
          .from('habits')
          .select()
          .eq('user_id', userId)
          .eq('archived', false)
          .order('created_at', ascending: true);

      return (response as List).map((h) => Habit.fromJson(h)).toList();
    } catch (e) {
      Logger.error('Error fetching habits: $e');
      rethrow;
    }
  }

  Future<Habit> createHabit(String name) async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final response = await supabaseClient
          .from('habits')
          .insert({
            'user_id': userId,
            'name': name,
            'archived': false,
          })
          .select()
          .single();

      return Habit.fromJson(response);
    } catch (e) {
      Logger.error('Error creating habit: $e');
      rethrow;
    }
  }

  Future<void> archiveHabit(String habitId) async {
    try {
      await supabaseClient
          .from('habits')
          .update({'archived': true}).eq('id', habitId);
    } catch (e) {
      Logger.error('Error archiving habit: $e');
      rethrow;
    }
  }

  Future<void> unarchiveHabit(String habitId) async {
    try {
      await supabaseClient
          .from('habits')
          .update({'archived': false}).eq('id', habitId);
    } catch (e) {
      Logger.error('Error unarchiving habit: $e');
      rethrow;
    }
  }

  Future<void> updateHabit(String habitId, String name) async {
    try {
      await supabaseClient
          .from('habits')
          .update({'name': name}).eq('id', habitId);
    } catch (e) {
      Logger.error('Error updating habit: $e');
      rethrow;
    }
  }

  Future<void> deleteHabit(String habitId) async {
    try {
      await supabaseClient.from('habits').delete().eq('id', habitId);
    } catch (e) {
      Logger.error('Error deleting habit: $e');
      rethrow;
    }
  }
}
