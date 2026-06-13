import 'package:intl/intl.dart';

class Habit {
  final String id;
  final String userId;
  final String name;
  final bool archived;
  final DateTime createdAt;
  final DateTime updatedAt;

  Habit({
    required this.id,
    required this.userId,
    required this.name,
    required this.archived,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Habit.fromJson(Map<String, dynamic> json) {
    return Habit(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      name: json['name'] as String,
      archived: json['archived'] as bool? ?? false,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'name': name,
      'archived': archived,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}

class DailyEntry {
  final String id;
  final String userId;
  final DateTime date;
  final int mood;
  final int energy;
  final int focus;
  final String? notes;
  final DateTime createdAt;
  final DateTime updatedAt;

  DailyEntry({
    required this.id,
    required this.userId,
    required this.date,
    required this.mood,
    required this.energy,
    required this.focus,
    this.notes,
    required this.createdAt,
    required this.updatedAt,
  });

  factory DailyEntry.fromJson(Map<String, dynamic> json) {
    return DailyEntry(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      date: DateTime.parse(json['date'] as String),
      mood: json['mood'] as int,
      energy: json['energy'] as int,
      focus: json['focus'] as int,
      notes: json['notes'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'date': DateFormat('yyyy-MM-dd').format(date),
      'mood': mood,
      'energy': energy,
      'focus': focus,
      'notes': notes,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}

class HabitLog {
  final String id;
  final String userId;
  final String habitId;
  final DateTime date;
  final bool completed;
  final DateTime createdAt;
  final DateTime updatedAt;

  HabitLog({
    required this.id,
    required this.userId,
    required this.habitId,
    required this.date,
    required this.completed,
    required this.createdAt,
    required this.updatedAt,
  });

  factory HabitLog.fromJson(Map<String, dynamic> json) {
    return HabitLog(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      habitId: json['habit_id'] as String,
      date: DateTime.parse(json['date'] as String),
      completed: json['completed'] as bool,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'habit_id': habitId,
      'date': DateFormat('yyyy-MM-dd').format(date),
      'completed': completed,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}
