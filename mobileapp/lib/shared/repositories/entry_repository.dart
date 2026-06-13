import 'package:intl/intl.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/models.dart';
import '../services/logger.dart';

class EntryRepository {
  final SupabaseClient supabaseClient;

  EntryRepository({required this.supabaseClient});

  Future<DailyEntry?> getTodayEntry() async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final today = DateFormat('yyyy-MM-dd').format(DateTime.now());

      final response = await supabaseClient
          .from('daily_entries')
          .select()
          .eq('user_id', userId)
          .eq('date', today)
          .maybeSingle();

      return response != null ? DailyEntry.fromJson(response) : null;
    } catch (e) {
      Logger.error('Error fetching today entry: $e');
      rethrow;
    }
  }

  Future<DailyEntry> createEntry({
    required DateTime date,
    required int mood,
    required int energy,
    required int focus,
    String? notes,
  }) async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final dateStr = DateFormat('yyyy-MM-dd').format(date);

      final response = await supabaseClient
          .from('daily_entries')
          .insert({
            'user_id': userId,
            'date': dateStr,
            'mood': mood,
            'energy': energy,
            'focus': focus,
            'notes': notes,
          })
          .select()
          .single();

      return DailyEntry.fromJson(response);
    } catch (e) {
      Logger.error('Error creating entry: $e');
      rethrow;
    }
  }

  Future<DailyEntry> updateEntry(
    String entryId, {
    required int mood,
    required int energy,
    required int focus,
    String? notes,
  }) async {
    try {
      final response = await supabaseClient
          .from('daily_entries')
          .update({
            'mood': mood,
            'energy': energy,
            'focus': focus,
            'notes': notes,
          })
          .eq('id', entryId)
          .select()
          .single();

      return DailyEntry.fromJson(response);
    } catch (e) {
      Logger.error('Error updating entry: $e');
      rethrow;
    }
  }

  Future<List<DailyEntry>> getRecentEntries({int days = 30}) async {
    try {
      final userId = supabaseClient.auth.currentUser!.id;
      final startDate =
          DateTime.now().subtract(Duration(days: days)).toIso8601String();

      final response = await supabaseClient
          .from('daily_entries')
          .select()
          .eq('user_id', userId)
          .gte('date', startDate)
          .order('date', ascending: false);

      return (response as List).map((e) => DailyEntry.fromJson(e)).toList();
    } catch (e) {
      Logger.error('Error fetching recent entries: $e');
      rethrow;
    }
  }
}
