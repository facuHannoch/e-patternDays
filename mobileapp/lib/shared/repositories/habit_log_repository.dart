import 'package:intl/intl.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/models.dart';
import '../services/logger.dart';

class HabitLogRepository {
  final SupabaseClient supabaseClient;

  HabitLogRepository({required this.supabaseClient});

  Future<List<HabitLog>> getLogsForDate(DateTime date) async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final dateStr = DateFormat('yyyy-MM-dd').format(date);

      final response = await supabaseClient
          .from('habit_logs')
          .select()
          .eq('user_id', userId)
          .eq('date', dateStr)
          .order('created_at', ascending: true);

      return (response as List).map((log) => HabitLog.fromJson(log)).toList();
    } catch (e) {
      Logger.error('Error fetching habit logs for date: $e');
      rethrow;
    }
  }

  Future<HabitLog?> getHabitLogForDate(String habitId, DateTime date) async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final dateStr = DateFormat('yyyy-MM-dd').format(date);

      final response = await supabaseClient
          .from('habit_logs')
          .select()
          .eq('user_id', userId)
          .eq('habit_id', habitId)
          .eq('date', dateStr)
          .maybeSingle();

      return response != null ? HabitLog.fromJson(response) : null;
    } catch (e) {
      Logger.error('Error fetching habit log: $e');
      rethrow;
    }
  }

  Future<HabitLog> createOrUpdateLog({
    required String habitId,
    required DateTime date,
    required bool completed,
  }) async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final dateStr = DateFormat('yyyy-MM-dd').format(date);

      final existing = await getHabitLogForDate(habitId, date);

      if (existing != null) {
        // Update existing
        final response = await supabaseClient
            .from('habit_logs')
            .update({'completed': completed})
            .eq('id', existing.id)
            .select()
            .single();

        return HabitLog.fromJson(response);
      } else {
        // Create new
        final response = await supabaseClient
            .from('habit_logs')
            .insert({
              'user_id': userId,
              'habit_id': habitId,
              'date': dateStr,
              'completed': completed,
            })
            .select()
            .single();

        return HabitLog.fromJson(response);
      }
    } catch (e) {
      Logger.error('Error creating/updating habit log: $e');
      rethrow;
    }
  }
}
